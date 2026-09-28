package websuachuadientu.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import websuachuadientu.dto.EmployeeRequest;
import websuachuadientu.entity.Employee;
import websuachuadientu.repository.EmployeeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAll(String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return employeeRepository.findAll();
        }

        return employeeRepository
                .findByFullNameContainingIgnoreCaseOrPhoneContaining(
                        keyword,
                        keyword
                );
    }

    public Employee getById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy nhân viên"));
    }

    public Employee create(EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new RuntimeException("Mã nhân viên đã tồn tại");
        }

        if (employeeRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Số điện thoại đã tồn tại");
        }

        Employee employee = new Employee();

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFullName(request.getFullName());
        employee.setPhone(request.getPhone());
        employee.setRole(request.getRole());
        employee.setStatus("ACTIVE");

        return employeeRepository.save(employee);
    }

    public Employee update(Long id, EmployeeRequest request) {

        Employee employee = getById(id);

        employee.setFullName(request.getFullName());
        employee.setPhone(request.getPhone());
        employee.setRole(request.getRole());

        return employeeRepository.save(employee);
    }

    public Employee changeStatus(Long id) {

        Employee employee = getById(id);

        if ("ACTIVE".equals(employee.getStatus())) {
            employee.setStatus("LOCKED");
        } else {
            employee.setStatus("ACTIVE");
        }

        return employeeRepository.save(employee);
    }

    public void delete(Long id) {

        Employee employee = getById(id);

        employeeRepository.delete(employee);
    }
}