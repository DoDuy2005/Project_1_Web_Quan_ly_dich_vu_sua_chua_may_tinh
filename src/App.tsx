import { useMemo, useState } from "react";
import {
  Activity, AlertCircle, ArrowRight, BarChart3, Bell, CalendarDays,
  Check, CheckCircle2, ChevronDown, Clock3, CreditCard, FileCheck2,
  FileText, Headphones, LayoutDashboard, LogOut, Menu, MonitorCog,
  Moon, MoreHorizontal, PackageCheck, PanelLeftClose, PanelLeftOpen,
  Pencil, Plus, Search, Settings, ShieldCheck, Smartphone, Sparkles,
  Sun, Tablet, UserCircle2, Users, Wrench, X, Zap
} from "lucide-react";

type Role = "customer" | "technician" | "manager";
type Screen = string;

const nav = {
  customer: [
    ["Tổng quan", "dashboard", LayoutDashboard],
    ["Xem dịch vụ", "services", Wrench],
    ["Đặt lịch", "booking", CalendarDays],
    ["Lịch hẹn của tôi", "appointments", CalendarDays],
    ["Theo dõi sửa chữa", "tracking", Activity],
    ["Báo giá & thanh toán", "quotes", CreditCard],
    ["Lịch sử sửa chữa", "history", FileText],
    ["Đánh giá dịch vụ", "review", Sparkles],
    ["Yêu cầu bảo hành", "warranty", ShieldCheck],
    ["Thông tin cá nhân", "profile", UserCircle2],
  ],
  technician: [
    ["Tổng quan", "dashboard", LayoutDashboard],
    ["Xử lý lịch hẹn", "appointments", CalendarDays],
    ["Tiếp nhận thiết bị", "intake", PackageCheck],
    ["Phiếu sửa chữa", "repair-tickets", FileText],
    ["Chẩn đoán & đề xuất", "diagnosis", MonitorCog],
    ["Tạo & gửi báo giá", "quote-create", CreditCard],
    ["Thực hiện sửa chữa", "repair", Wrench],
    ["Kiểm tra & hoàn thành", "completion", CheckCircle2],
  ],
  manager: [
    ["Tổng quan", "dashboard", LayoutDashboard],
    ["Quản lý nhân viên", "staff", Users],
    ["Quản lý dịch vụ", "service-admin", Wrench],
    ["Quản lý khách hàng", "customers", Users],
    ["Quản lý phiếu sửa chữa", "ticket-admin", FileText],
    ["Xem báo cáo", "reports", BarChart3],
    ["Lịch hẹn", "appointments", CalendarDays],
  ],
} as const;

const stats = [
  { label: "Lịch hẹn hôm nay", value: "18", change: "+12.5%", icon: CalendarDays },
  { label: "Đang sửa chữa", value: "27", change: "+4.8%", icon: Wrench },
  { label: "Chờ báo giá", value: "08", change: "-8.1%", icon: FileCheck2 },
  { label: "Hoàn thành tháng này", value: "126", change: "+18.2%", icon: CheckCircle2 },
];

const appointments = [
  { id: "LH-24091", customer: "Nguyễn Văn A", device: "Dell Inspiron 15", service: "Vệ sinh + bảo dưỡng", time: "09:00", status: "Đã xác nhận" },
  { id: "LH-24092", customer: "Trần Minh K", device: "MacBook Pro 14", service: "Không lên nguồn", time: "10:30", status: "Chờ tiếp nhận" },
  { id: "LH-24093", customer: "Lê Hoàng N", device: "ASUS TUF Gaming", service: "Thay keo tản nhiệt", time: "13:30", status: "Đã xác nhận" },
  { id: "LH-24094", customer: "Phạm Gia H", device: "HP Pavilion", service: "Cài Windows", time: "15:00", status: "Chờ xác nhận" },
];

const tickets = [
  { id: "PS-00842", device: "MacBook Pro 14", customer: "Trần Minh K", tech: "Nguyễn Hoàng", progress: 72, status: "Đang sửa", amount: "1.850.000đ" },
  { id: "PS-00841", device: "Dell Inspiron 15", customer: "Nguyễn Văn A", tech: "Lê Quốc B", progress: 100, status: "Hoàn thành", amount: "450.000đ" },
  { id: "PS-00840", device: "ASUS TUF Gaming", customer: "Lê Hoàng N", tech: "Nguyễn Hoàng", progress: 35, status: "Đang chẩn đoán", amount: "Đang báo giá" },
  { id: "PS-00839", device: "HP Pavilion", customer: "Phạm Gia H", tech: "Trần Đức", progress: 10, status: "Mới tiếp nhận", amount: "Chưa xác định" },
];

const services = [
  { name: "Vệ sinh & bảo dưỡng", desc: "Làm sạch bụi, kiểm tra tản nhiệt và phần cứng.", price: "Từ 150.000đ", time: "60–90 phút", icon: Sparkles },
  { name: "Cài đặt Windows", desc: "Cài Windows, driver và tối ưu hệ thống cơ bản.", price: "Từ 200.000đ", time: "90–120 phút", icon: MonitorCog },
  { name: "Sửa lỗi không lên nguồn", desc: "Kiểm tra nguồn, mainboard và linh kiện liên quan.", price: "Báo giá sau chẩn đoán", time: "2–5 ngày", icon: Zap },
  { name: "Thay keo tản nhiệt", desc: "Thay keo CPU/GPU và kiểm tra nhiệt độ sau sửa.", price: "Từ 250.000đ", time: "60 phút", icon: Wrench },
  { name: "Nâng cấp RAM/SSD", desc: "Tư vấn và lắp đặt RAM, SSD tương thích.", price: "Từ 100.000đ", time: "30–60 phút", icon: PackageCheck },
  { name: "Cứu dữ liệu", desc: "Khôi phục dữ liệu trong các trường hợp có thể xử lý.", price: "Liên hệ báo giá", time: "1–7 ngày", icon: FileCheck2 },
];

function App() {
  const [role, setRole] = useState<Role>("manager");
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentNav = nav[role];
  const currentTitle = currentNav.find((x) => x[1] === screen)?.[0] ?? "Tổng quan";

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const changeRole = (next: Role) => {
    setRole(next);
    setScreen("dashboard");
    setMobileOpen(false);
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Wrench size={19} /></div>
          {!collapsed && <div><strong>Fix<span>Hub</span></strong><small>Repair Management</small></div>}
        </div>

        <div className="role-switch">
          <span className="eyebrow">CHẾ ĐỘ HIỂN THỊ</span>
          <select value={role} onChange={(e) => changeRole(e.target.value as Role)}>
            <option value="manager">Quản lý cửa hàng</option>
            <option value="technician">Nhân viên sửa chữa</option>
            <option value="customer">Khách hàng</option>
          </select>
        </div>

        <nav>
          {currentNav.map(([label, id, Icon]) => (
            <button key={id} className={screen === id ? "nav-item active" : "nav-item"} onClick={() => { setScreen(id); setMobileOpen(false); }}>
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && id === "appointments" && <b className="nav-badge">4</b>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setScreen("settings")}><Settings size={18}/>{!collapsed && <span>Cài đặt</span>}</button>
          <button className="nav-item" onClick={() => { setModal("logout"); }}><LogOut size={18}/>{!collapsed && <span>Đăng xuất</span>}</button>
          <div className="profile-mini">
            <div className="avatar">NH</div>
            {!collapsed && <div><strong>Nguyễn Hoàng</strong><span>{role === "manager" ? "Quản lý" : role === "technician" ? "Kỹ thuật viên" : "Khách hàng"}</span></div>}
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="top-left">
            <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={20}/></button>
            <button className="icon-btn collapse-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <PanelLeftOpen size={19}/> : <PanelLeftClose size={19}/>}
            </button>
            <div className="breadcrumb"><span>FixHub</span><ArrowRight size={14}/><strong>{currentTitle}</strong></div>
          </div>
          <div className="top-actions">
            <div className="global-search">
              <Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm khách hàng, phiếu, thiết bị..." />
              <kbd>⌘ K</kbd>
            </div>
            <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <button className="icon-btn notification"><Bell size={18}/><i>3</i></button>
            <div className="top-avatar">NH</div>
          </div>
        </header>

        <div className="page">
          {screen === "dashboard" && <Dashboard role={role} onAction={setScreen} onNotify={notify}/>}
          {screen === "services" && <Services onBook={() => setScreen("booking")} />}
          {screen === "booking" && <Booking onDone={() => { notify("Đặt lịch thành công."); setScreen("appointments"); }} />}
          {screen === "appointments" && <Appointments role={role} onAction={setScreen} />}
          {screen === "tracking" && <Tracking />}
          {screen === "quotes" && <Quotes onPay={() => setModal("payment")} />}
          {screen === "history" && <History />}
          {screen === "review" && <Review onDone={() => notify("Cảm ơn bạn đã đánh giá dịch vụ.")} />}
          {screen === "warranty" && <Warranty onDone={() => notify("Yêu cầu bảo hành đã được gửi.")} />}
          {screen === "profile" && <Profile onSave={() => notify("Đã lưu thông tin cá nhân.")} />}
          {screen === "intake" && <Intake onDone={() => notify("Đã tiếp nhận thiết bị.")} />}
          {screen === "repair-tickets" && <RepairTickets />}
          {screen === "diagnosis" && <Diagnosis onDone={() => notify("Đã lưu chẩn đoán.")} />}
          {screen === "quote-create" && <QuoteCreate onDone={() => notify("Báo giá đã được tạo và gửi.")} />}
          {screen === "repair" && <RepairExecution onDone={() => notify("Đã cập nhật tiến độ sửa chữa.")} />}
          {screen === "completion" && <Completion onDone={() => notify("Phiếu đã được chuyển sang hoàn thành.")} />}
          {screen === "staff" && <Staff onAction={() => setModal("staff")} />}
          {screen === "service-admin" && <ServiceAdmin onAction={() => setModal("service")} />}
          {screen === "customers" && <Customers />}
          {screen === "ticket-admin" && <TicketAdmin />}
          {screen === "reports" && <Reports />}
          {screen === "settings" && <SettingsPage />}
        </div>
      </main>

      {toast && <div className="toast"><CheckCircle2 size={18}/><span>{toast}</span></div>}
      {modal === "payment" && <Modal title="Thanh toán online" onClose={() => setModal(null)}><Payment onDone={() => {setModal(null); notify("Thanh toán thành công.");}} /></Modal>}
      {modal === "logout" && <Modal title="Đăng xuất" onClose={() => setModal(null)}><Confirm text="Bạn có chắc muốn đăng xuất khỏi hệ thống?" onDone={() => {setModal(null); notify("Đã đăng xuất.");}} /></Modal>}
      {modal === "staff" && <Modal title="Thêm nhân viên" onClose={() => setModal(null)}><StaffForm onDone={() => {setModal(null); notify("Đã thêm nhân viên.");}} /></Modal>}
      {modal === "service" && <Modal title="Thêm dịch vụ" onClose={() => setModal(null)}><ServiceForm onDone={() => {setModal(null); notify("Đã thêm dịch vụ.");}} /></Modal>}
    </div>
  );
}

function PageHead({eyebrow, title, desc, action}: {eyebrow?: string; title: string; desc?: string; action?: React.ReactNode}) {
  return <div className="page-head">
    <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{desc && <p>{desc}</p>}</div>
    {action && <div className="head-action">{action}</div>}
  </div>;
}

function Button({children, variant="primary", onClick, icon}: {children: React.ReactNode; variant?: "primary"|"ghost"|"soft"|"danger"; onClick?:()=>void; icon?:React.ReactNode}) {
  return <button className={`btn ${variant}`} onClick={onClick}>{icon}{children}</button>;
}

function Status({children, tone="blue"}: {children: React.ReactNode; tone?: "blue"|"green"|"amber"|"red"|"gray"}) {
  return <span className={`status ${tone}`}><i />{children}</span>;
}

function Dashboard({role,onAction,onNotify}:{role:Role;onAction:(s:string)=>void;onNotify:(s:string)=>void}) {
  const isCustomer = role === "customer";
  return <div className="animate-in">
    <PageHead eyebrow={isCustomer ? "KHÔNG GIAN KHÁCH HÀNG" : "TRUNG TÂM ĐIỀU HÀNH"} title={isCustomer ? "Xin chào, Nguyễn Hoàng 👋" : "Tổng quan hệ thống"} desc={isCustomer ? "Theo dõi lịch hẹn và tình trạng thiết bị của bạn." : "Theo dõi toàn bộ hoạt động sửa chữa trong ngày."} action={<Button icon={<Plus size={17}/>} onClick={()=>onAction(isCustomer?"booking":"intake")}>{isCustomer ? "Đặt lịch mới" : "Tiếp nhận thiết bị"}</Button>} />
    {isCustomer ? <CustomerDashboard onAction={onAction}/> : <ManagerDashboard onAction={onAction} onNotify={onNotify}/>}
  </div>
}

function ManagerDashboard({onAction,onNotify}:{onAction:(s:string)=>void;onNotify:(s:string)=>void}) {
  return <>
    <div className="stats-grid">{stats.map((s,i)=><div className="stat-card" key={s.label}><div className="stat-top"><div className={`stat-icon icon-${i}`}><s.icon size={19}/></div><span className="trend"><ArrowRight size={13}/>{s.change}</span></div><strong>{s.value}</strong><span>{s.label}</span><div className="spark"><i style={{width: (38 + i * 13) + "%"}}/></div></div>)}</div>
    <div className="dashboard-grid">
      <section className="panel span-2">
        <div className="panel-head"><div><h3>Lịch hẹn hôm nay</h3><span>28/09/2026 · 18 lịch hẹn</span></div><Button variant="ghost" onClick={()=>onAction("appointments")}>Xem tất cả <ArrowRight size={15}/></Button></div>
        <div className="table-wrap"><table><thead><tr><th>Mã lịch</th><th>Khách hàng</th><th>Thiết bị</th><th>Giờ</th><th>Trạng thái</th><th></th></tr></thead><tbody>{appointments.map(a=><tr key={a.id}><td><strong>{a.id}</strong></td><td>{a.customer}</td><td>{a.device}<small>{a.service}</small></td><td>{a.time}</td><td><Status tone={a.status==="Đã xác nhận"?"green":a.status==="Chờ xác nhận"?"amber":"blue"}>{a.status}</Status></td><td><button className="more"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><h3>Trạng thái sửa chữa</h3><span>Live overview</span></div><Activity size={18}/></div>
        <div className="progress-list">{tickets.map(t=><div className="progress-item" key={t.id}><div className="row-between"><strong>{t.id}</strong><span>{t.progress}%</span></div><div className="progress"><i style={{width: t.progress + "%"}}/></div><div className="row-between muted"><span>{t.device}</span><span>{t.status}</span></div></div>)}</div>
      </section>
      <section className="panel revenue-card">
        <div className="panel-head"><div><h3>Doanh thu</h3><span>Tháng 09/2026</span></div><span className="live-dot">● Live</span></div>
        <strong className="big-money">125.500.000đ</strong>
        <div className="chart"><div className="bars">{[44,58,48,70,62,82,76,91,72,84,96,88].map((h,i)=><i key={i} style={{height: h + "%"}} />)}</div><div className="chart-labels"><span>T1</span><span>T4</span><span>T7</span><span>T10</span><span>T12</span></div></div>
        <Button variant="soft" onClick={()=>onAction("reports")}>Xem báo cáo</Button>
      </section>
    </div>
    <div className="quick-strip"><div><Sparkles size={18}/><span><strong>AI Insight</strong> · Tỷ lệ hoàn thành đang tăng 18,2% so với tháng trước.</span></div><button onClick={()=>onNotify("Đã mở báo cáo phân tích.")}>Xem phân tích <ArrowRight size={15}/></button></div>
  </>
}

function CustomerDashboard({onAction}:{onAction:(s:string)=>void}) {
  return <>
    <div className="customer-hero"><div><span className="pill">● Đang sửa chữa</span><h2>MacBook Pro 14</h2><p>Phiếu <strong>PS-00842</strong> · Kỹ thuật viên Nguyễn Hoàng</p><div className="big-progress"><i style={{width:"72%"}}/></div><div className="row-between"><small>Chẩn đoán → Sửa chữa</small><strong>72%</strong></div></div><div className="device-orb"><LaptopGlyph/></div></div>
    <div className="customer-grid">
      <section className="panel"><div className="panel-head"><div><h3>Lịch hẹn sắp tới</h3><span>Thứ Ba · 29/09/2026</span></div><CalendarDays size={18}/></div><div className="appointment-card"><div className="date-box"><strong>29</strong><span>TH9</span></div><div><strong>09:30 — Tiếp nhận thiết bị</strong><p>Chi nhánh Cầu Giấy · FixHub</p></div><Status tone="green">Đã xác nhận</Status></div><Button variant="ghost" onClick={()=>onAction("appointments")}>Quản lý lịch hẹn <ArrowRight size={15}/></Button></section>
      <section className="panel"><div className="panel-head"><div><h3>Báo giá cần duyệt</h3><span>PS-00842</span></div><CreditCard size={18}/></div><div className="quote-total"><span>Tổng chi phí dự kiến</span><strong>1.850.000đ</strong></div><div className="quote-actions"><Button onClick={()=>onAction("quotes")}>Xem báo giá</Button><Button variant="ghost" onClick={()=>onAction("tracking")}>Theo dõi sửa chữa</Button></div></section>
    </div>
  </>
}

function Services({onBook}:{onBook:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="DỊCH VỤ" title="Dịch vụ sửa chữa" desc="Chọn dịch vụ phù hợp và đặt lịch trực tuyến trong vài bước." action={<Button icon={<Plus size={17}/>} onClick={onBook}>Đặt lịch</Button>}/><div className="service-toolbar"><div className="search-field"><Search size={17}/><input placeholder="Tìm tên dịch vụ..." /></div><select><option>Tất cả danh mục</option><option>Phần mềm</option><option>Phần cứng</option><option>Bảo trì</option></select></div><div className="service-grid">{services.map((s,i)=><div className="service-card" key={s.name}><div className="service-icon"><s.icon size={21}/></div><div className="service-top"><span className="service-no">0{i+1}</span><span className="mini-arrow">↗</span></div><h3>{s.name}</h3><p>{s.desc}</p><div className="service-meta"><span><CreditCard size={14}/>{s.price}</span><span><Clock3 size={14}/>{s.time}</span></div><Button variant="soft" onClick={onBook}>Đặt dịch vụ <ArrowRight size={15}/></Button></div>)}</div></div>
}

function Booking({onDone}:{onDone:()=>void}) {
  const [step,setStep]=useState(1);
  return <div className="animate-in"><PageHead eyebrow="ĐẶT LỊCH" title="Tạo lịch hẹn sửa chữa" desc="Hoàn tất thông tin để kỹ thuật viên chuẩn bị trước khi bạn đến."/><div className="steps"><div className={step>=1?"step active":"step"}><b>01</b><span>Thiết bị</span></div><div className={step>=2?"step active":"step"}><b>02</b><span>Dịch vụ</span></div><div className={step>=3?"step active":"step"}><b>03</b><span>Thời gian</span></div><div className={step>=4?"step active":"step"}><b>04</b><span>Xác nhận</span></div></div><div className="form-layout"><section className="panel form-panel"><div className="panel-head"><div><h3>{step===1?"Thông tin thiết bị":step===2?"Chọn dịch vụ":step===3?"Chọn thời gian":"Xác nhận lịch hẹn"}</h3><span>Bước {step}/4</span></div></div>{step===1&&<><Field label="Tên thiết bị"><input placeholder="Ví dụ: Dell Inspiron 15 5510"/></Field><div className="two"><Field label="Loại thiết bị"><select><option>Laptop</option><option>PC</option><option>MacBook</option><option>Máy tính bảng</option></select></Field><Field label="Serial / IMEI"><input placeholder="Không bắt buộc"/></Field></div><Field label="Mô tả tình trạng"><textarea placeholder="Mô tả lỗi hoặc tình trạng thiết bị..." rows={5}/></Field></>}{step===2&&<div className="choice-grid">{services.slice(0,4).map(s=><button className="choice-card" key={s.name}><s.icon/><strong>{s.name}</strong><span>{s.price}</span></button>)}</div>}{step===3&&<><Field label="Chi nhánh"><select><option>FixHub Cầu Giấy — 128 Xuân Thủy</option><option>FixHub Thanh Xuân — 52 Nguyễn Trãi</option></select></Field><div className="date-pills">{["29/09","30/09","01/10","02/10"].map((d,i)=><button className={i===0?"selected":""} key={d}><strong>{d}</strong><span>{["Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu"][i]}</span></button>)}</div><div className="time-grid">{["08:30","09:30","10:30","13:30","14:30","15:30","16:30"].map((t,i)=><button className={i===1?"selected":""} key={t}>{t}</button>)}</div></>}{step===4&&<div className="confirm-box"><CheckCircle2 size={42}/><h3>Sẵn sàng đặt lịch</h3><p>Dell Inspiron 15 · Vệ sinh & bảo dưỡng<br/>29/09/2026 · 09:30 · Cầu Giấy</p><strong>Phí dịch vụ dự kiến: 150.000đ</strong></div>}<div className="form-actions">{step>1&&<Button variant="ghost" onClick={()=>setStep(step-1)}>Quay lại</Button>}<Button onClick={()=>step<4?setStep(step+1):onDone()}>{step<4?"Tiếp tục":"Xác nhận đặt lịch"} <ArrowRight size={15}/></Button></div></section><aside className="panel booking-summary"><span className="eyebrow">TÓM TẮT</span><h3>Lịch hẹn của bạn</h3><SummaryRow label="Thiết bị" value="Dell Inspiron 15"/><SummaryRow label="Dịch vụ" value="Vệ sinh & bảo dưỡng"/><SummaryRow label="Ngày" value="29/09/2026"/><SummaryRow label="Giờ" value="09:30"/><SummaryRow label="Chi nhánh" value="Cầu Giấy"/><div className="summary-total"><span>Dự kiến</span><strong>150.000đ</strong></div></aside></div></div>
}

function Appointments({role,onAction}:{role:Role;onAction:(s:string)=>void}) {
  return <div className="animate-in"><PageHead eyebrow="LỊCH HẸN" title={role==="customer"?"Lịch hẹn của tôi":"Quản lý lịch hẹn"} desc="Theo dõi, xác nhận và xử lý lịch hẹn theo trạng thái." action={<Button icon={<Plus size={17}/>} onClick={()=>onAction("booking")}>Đặt lịch mới</Button>}/><div className="filter-row"><div className="segmented"><button className="active">Tất cả <b>18</b></button><button>Chờ xác nhận <b>4</b></button><button>Đã xác nhận <b>10</b></button><button>Hoàn thành <b>4</b></button></div><div className="filter-right"><div className="search-field"><Search size={16}/><input placeholder="Tìm mã lịch..." /></div><button className="filter-btn">Bộ lọc <ChevronDown size={15}/></button></div></div><section className="panel"><div className="table-wrap"><table className="large"><thead><tr><th>Mã lịch</th><th>Ngày / Giờ</th><th>Khách hàng</th><th>Thiết bị</th><th>Dịch vụ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{appointments.concat(appointments.slice(0,2)).map((a,i)=><tr key={a.id+i}><td><strong>{a.id}</strong></td><td><strong>28/09/2026</strong><small>{a.time}</small></td><td>{a.customer}</td><td>{a.device}</td><td>{a.service}</td><td><Status tone={a.status==="Đã xác nhận"?"green":a.status==="Chờ xác nhận"?"amber":"blue"}>{a.status}</Status></td><td><button className="table-action" onClick={()=>onAction(role==="technician"?"intake":"tracking")}>Xem <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div></section></div>
}

function Tracking() {
  return <div className="animate-in"><PageHead eyebrow="THEO DÕI SỬA CHỮA" title="PS-00842 · MacBook Pro 14" desc="Cập nhật lần cuối 15 phút trước." action={<Button variant="soft">Tải phiếu</Button>}/><div className="tracking-layout"><section className="panel"><div className="tracking-head"><div className="device-avatar"><LaptopGlyph/></div><div><h3>MacBook Pro 14-inch</h3><p>Serial: C02ZQ0ABC123 · Tiếp nhận 26/09/2026</p></div><Status tone="blue">Đang sửa chữa</Status></div><div className="timeline"><TimelineItem done title="Tiếp nhận thiết bị" time="26/09 · 09:42" desc="Đã kiểm tra ngoại quan và phụ kiện đi kèm."/><TimelineItem done title="Chẩn đoán" time="26/09 · 14:10" desc="Xác định lỗi hệ thống nguồn và pin."/><TimelineItem current title="Đang sửa chữa" time="28/09 · 15:25" desc="Kỹ thuật viên đang thay linh kiện và kiểm tra nguồn."/><TimelineItem title="Kiểm tra & hoàn thành" time="Dự kiến 29/09" desc="Kiểm tra toàn bộ trước khi bàn giao."/><TimelineItem title="Bàn giao thiết bị" time="Chưa xác định"/></div></section><aside><section className="panel price-card"><span className="eyebrow">CHI PHÍ DỰ KIẾN</span><strong>1.850.000đ</strong><span>Đã bao gồm linh kiện + công sửa chữa</span><Button>Thanh toán khi hoàn thành</Button></section><section className="panel"><div className="panel-head"><h3>Thông tin kỹ thuật</h3><Headphones size={17}/></div><div className="tech-row"><div className="avatar">NH</div><div><strong>Nguyễn Hoàng</strong><span>Kỹ thuật viên · 4.9 ★</span></div></div></section></aside></div></div>
}

function Quotes({onPay}:{onPay:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="BÁO GIÁ" title="Báo giá sửa chữa" desc="Kiểm tra chi tiết trước khi duyệt và thanh toán."/><div className="quote-layout"><section className="panel quote-document"><div className="document-top"><div><span className="eyebrow">FIXHUB</span><h2>Báo giá #BG-00842</h2></div><Status tone="amber">Chờ duyệt</Status></div><div className="document-info"><span>Khách hàng <strong>Nguyễn Hoàng</strong></span><span>Phiếu sửa chữa <strong>PS-00842</strong></span><span>Ngày lập <strong>28/09/2026</strong></span></div><div className="table-wrap"><table><thead><tr><th>Hạng mục</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody><tr><td>Pin MacBook Pro 14</td><td>1</td><td>1.450.000đ</td><td><strong>1.450.000đ</strong></td></tr><tr><td>Công sửa chữa</td><td>1</td><td>400.000đ</td><td><strong>400.000đ</strong></td></tr></tbody></table></div><div className="document-total"><span>Tổng cộng</span><strong>1.850.000đ</strong></div><div className="document-note"><AlertCircle size={17}/><span>Giá trên đã bao gồm công sửa chữa. Linh kiện được bảo hành 6 tháng.</span></div><div className="form-actions"><Button variant="ghost">Từ chối</Button><Button onClick={onPay} icon={<Check size={16}/>}>Duyệt báo giá & thanh toán</Button></div></section></div></div>
}

function History() {
  return <div className="animate-in"><PageHead eyebrow="LỊCH SỬ" title="Lịch sử sửa chữa" desc="Tất cả thiết bị và dịch vụ bạn đã sử dụng."/><section className="panel"><div className="filter-row compact"><div className="search-field"><Search size={16}/><input placeholder="Tìm theo mã phiếu hoặc thiết bị..." /></div><select><option>Tất cả thời gian</option><option>30 ngày gần đây</option><option>6 tháng</option></select></div><div className="table-wrap"><table className="large"><thead><tr><th>Mã phiếu</th><th>Thiết bị</th><th>Dịch vụ</th><th>Ngày hoàn thành</th><th>Chi phí</th><th>Trạng thái</th><th></th></tr></thead><tbody>{tickets.map(t=><tr key={t.id}><td><strong>{t.id}</strong></td><td>{t.device}</td><td>Vệ sinh & sửa chữa</td><td>26/09/2026</td><td>{t.amount}</td><td><Status tone="green">Hoàn thành</Status></td><td><button className="table-action">Chi tiết <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div></section></div>
}

function Review({onDone}:{onDone:()=>void}) {
  const [rating,setRating]=useState(0);
  return <div className="animate-in"><PageHead eyebrow="ĐÁNH GIÁ" title="Đánh giá dịch vụ" desc="Phản hồi của bạn giúp FixHub cải thiện chất lượng phục vụ."/><section className="panel review-panel"><div className="review-service"><div className="service-icon"><Wrench/></div><div><strong>Vệ sinh & bảo dưỡng</strong><span>PS-00841 · 26/09/2026</span></div></div><div className="rating-block"><span>Bạn đánh giá trải nghiệm thế nào?</span><div className="stars">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setRating(n)} className={n<=rating?"selected":""}>★</button>)}</div><strong>{rating===5?"Tuyệt vời!":rating===4?"Rất tốt":rating===3?"Ổn":rating?"Cần cải thiện":"Chọn số sao"}</strong></div><Field label="Nhận xét"><textarea rows={6} placeholder="Chia sẻ trải nghiệm của bạn..." /></Field><div className="form-actions"><Button onClick={onDone}>Gửi đánh giá <ArrowRight size={15}/></Button></div></section></div>
}

function Warranty({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="BẢO HÀNH" title="Gửi yêu cầu bảo hành" desc="Tạo yêu cầu nếu thiết bị gặp vấn đề trong thời gian bảo hành."/><section className="panel narrow"><div className="form-grid"><Field label="Phiếu sửa chữa"><select><option>PS-00841 · Dell Inspiron 15</option><option>PS-00782 · ASUS TUF Gaming</option></select></Field><Field label="Ngày yêu cầu"><input type="date" defaultValue="2026-09-28"/></Field><Field label="Mô tả vấn đề"><textarea rows={6} placeholder="Mô tả lỗi phát sinh sau sửa chữa..." /></Field><Field label="Hình ảnh / tài liệu"><div className="upload"><Plus/><strong>Kéo thả file vào đây</strong><span>PNG, JPG hoặc PDF · tối đa 10MB</span></div></Field></div><div className="form-actions"><Button onClick={onDone}>Gửi yêu cầu bảo hành <ArrowRight size={15}/></Button></div></section></div>
}

function Profile({onSave}:{onSave:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="TÀI KHOẢN" title="Thông tin cá nhân" desc="Cập nhật thông tin liên hệ và tài khoản."/><section className="panel narrow"><div className="profile-cover"><div className="profile-large">NH</div><div><h3>Nguyễn Hoàng</h3><span>Khách hàng từ 2025</span></div><Button variant="ghost" icon={<Pencil size={15}/>}>Đổi ảnh</Button></div><div className="two"><Field label="Họ và tên"><input defaultValue="Nguyễn Hoàng"/></Field><Field label="Email"><input defaultValue="nguyenhoang@email.com"/></Field><Field label="Số điện thoại"><input defaultValue="0901 234 567"/></Field><Field label="Địa chỉ"><input defaultValue="Hà Nội"/></Field></div><div className="form-actions"><Button variant="ghost">Hủy</Button><Button onClick={onSave}>Lưu thay đổi</Button></div></section></div>
}

function Intake({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="TIẾP NHẬN THIẾT BỊ" title="Tiếp nhận thiết bị" desc="Ghi nhận đầy đủ tình trạng và phụ kiện khi khách giao máy."/><div className="form-layout"><section className="panel form-panel"><div className="two"><Field label="Mã lịch hẹn"><input defaultValue="LH-24092"/></Field><Field label="Khách hàng"><input defaultValue="Trần Minh K"/></Field><Field label="Loại thiết bị"><select><option>Laptop</option><option>PC</option><option>MacBook</option></select></Field><Field label="Tên thiết bị"><input defaultValue="MacBook Pro 14"/></Field><Field label="Serial"><input placeholder="Nhập serial..." /></Field><Field label="Mật khẩu thiết bị"><input placeholder="Nếu khách cung cấp" /></Field></div><Field label="Tình trạng ngoại quan"><textarea rows={4} placeholder="Mô tả trầy xước, móp, nứt, tình trạng màn hình..." /></Field><Field label="Phụ kiện đi kèm"><div className="check-grid"><label><input type="checkbox" defaultChecked/> Sạc</label><label><input type="checkbox" defaultChecked/> Túi đựng</label><label><input type="checkbox"/> Chuột</label><label><input type="checkbox"/> Khác</label></div></Field><div className="form-actions"><Button variant="ghost">Lưu nháp</Button><Button onClick={onDone}>Xác nhận tiếp nhận <Check size={16}/></Button></div></section><aside className="panel"><div className="panel-head"><h3>Checklist</h3><CheckCircle2 size={18}/></div>{["Kiểm tra ngoại quan","Chụp ảnh thiết bị","Ghi nhận phụ kiện","Xác nhận với khách"].map((x,i)=><div className="check-line" key={x}><span className={i<2?"checked":""}>{i<2?<Check size={13}/>:i+1}</span>{x}</div>)}</aside></div></div>
}

function RepairTickets() {
  return <div className="animate-in"><PageHead eyebrow="PHIẾU SỬA CHỮA" title="Quản lý phiếu sửa chữa" desc="Theo dõi toàn bộ vòng đời của thiết bị tại cửa hàng." action={<Button icon={<Plus size={17}/>}>Tạo phiếu</Button>}/><section className="panel"><div className="filter-row"><div className="segmented"><button className="active">Tất cả <b>42</b></button><button>Chờ xử lý <b>8</b></button><button>Đang sửa <b>27</b></button><button>Hoàn thành <b>7</b></button></div><div className="search-field"><Search size={16}/><input placeholder="Tìm phiếu..." /></div></div><div className="table-wrap"><table className="large"><thead><tr><th>Mã phiếu</th><th>Khách hàng</th><th>Thiết bị</th><th>Kỹ thuật viên</th><th>Tiến độ</th><th>Trạng thái</th><th>Chi phí</th></tr></thead><tbody>{tickets.concat(tickets).map((t,i)=><tr key={t.id+i}><td><strong>{t.id}</strong></td><td>{t.customer}</td><td>{t.device}</td><td>{t.tech}</td><td><div className="mini-progress"><i style={{width: t.progress + "%"}}/></div><small>{t.progress}%</small></td><td><Status tone={t.status==="Hoàn thành"?"green":"blue"}>{t.status}</Status></td><td>{t.amount}</td></tr>)}</tbody></table></div></section></div>
}

function Diagnosis({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="CHẨN ĐOÁN" title="Chẩn đoán & đề xuất sửa chữa" desc="Ghi nhận nguyên nhân lỗi và phương án xử lý cho PS-00840."/><section className="panel narrow"><div className="device-summary"><div className="device-avatar"><LaptopGlyph/></div><div><strong>PS-00840 · ASUS TUF Gaming</strong><span>Khách hàng: Lê Hoàng N · Tiếp nhận 27/09/2026</span></div></div><div className="two"><Field label="Mức độ lỗi"><select><option>Trung bình</option><option>Nhẹ</option><option>Nghiêm trọng</option></select></Field><Field label="Thời gian dự kiến"><input defaultValue="2 ngày" /></Field></div><Field label="Kết quả chẩn đoán"><textarea rows={5} placeholder="Nguyên nhân lỗi..." /></Field><Field label="Đề xuất sửa chữa"><textarea rows={5} placeholder="Phương án xử lý, linh kiện cần thay..." /></Field><div className="form-actions"><Button variant="ghost">Lưu nháp</Button><Button onClick={onDone}>Lưu & tạo báo giá <ArrowRight size={15}/></Button></div></section></div>
}

function QuoteCreate({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="BÁO GIÁ" title="Tạo & gửi báo giá" desc="Thêm linh kiện, công sửa chữa và gửi báo giá cho khách hàng."/><section className="panel"><div className="two"><Field label="Mã phiếu"><input defaultValue="PS-00842"/></Field><Field label="Khách hàng"><input defaultValue="Nguyễn Hoàng"/></Field></div><div className="line-items"><div className="line-head"><strong>Hạng mục</strong><strong>Số lượng</strong><strong>Đơn giá</strong><strong>Thành tiền</strong><span/></div>{["Pin MacBook Pro 14","Công sửa chữa"].map((x,i)=><div className="line-row" key={x}><input defaultValue={x}/><input defaultValue="1"/><input defaultValue={i===0?"1450000":"400000"}/><strong>{i===0?"1.450.000":"400.000"}đ</strong><button className="icon-btn"><X size={15}/></button></div>)}<button className="add-line"><Plus size={15}/> Thêm hạng mục</button></div><div className="quote-bottom"><div><span>Tổng cộng</span><strong>1.850.000đ</strong></div><Button onClick={onDone}>Lưu & gửi khách hàng <ArrowRight size={15}/></Button></div></section></div>
}

function RepairExecution({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="THỰC HIỆN SỬA CHỮA" title="PS-00842 · MacBook Pro 14" desc="Cập nhật các bước thực hiện và linh kiện đã sử dụng."/><div className="repair-layout"><section className="panel"><div className="panel-head"><div><h3>Checklist sửa chữa</h3><span>3/5 hạng mục đã hoàn thành</span></div><span className="percent">60%</span></div>{["Tháo máy & vệ sinh","Thay pin","Kiểm tra nguồn","Test sạc","Stress test 30 phút"].map((x,i)=><label className="repair-check" key={x}><input type="checkbox" defaultChecked={i<3}/><span><strong>{x}</strong><small>{i<3?"Đã hoàn thành":"Đang chờ thực hiện"}</small></span><Clock3 size={16}/></label>)}<Field label="Ghi chú kỹ thuật"><textarea rows={5} placeholder="Ghi chú quá trình sửa chữa..." /></Field><div className="form-actions"><Button onClick={onDone}>Cập nhật tiến độ</Button></div></section><aside><section className="panel"><span className="eyebrow">TIẾN ĐỘ</span><div className="circle-progress"><strong>60%</strong><span>Đang sửa</span></div></section><section className="panel"><h3>Linh kiện</h3><SummaryRow label="Pin MacBook Pro 14" value="1.450.000đ"/><SummaryRow label="Công sửa chữa" value="400.000đ"/></section></aside></div></div>
}

function Completion({onDone}:{onDone:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="KIỂM TRA & HOÀN THÀNH" title="Kiểm tra và hoàn thành phiếu" desc="Đảm bảo thiết bị hoạt động ổn định trước khi bàn giao."/><section className="panel narrow"><div className="completion-banner"><CheckCircle2 size={36}/><div><h3>Thiết bị sẵn sàng bàn giao</h3><p>PS-00841 · Dell Inspiron 15</p></div></div><div className="check-grid-box">{["Nguồn & sạc","Màn hình","Bàn phím / touchpad","Wi-Fi / Bluetooth","Nhiệt độ","Kiểm tra phần mềm"].map(x=><label key={x}><input type="checkbox" defaultChecked/>{x}</label>)}</div><Field label="Kết quả kiểm tra"><textarea rows={5} defaultValue="Thiết bị hoạt động ổn định sau sửa chữa. Đã vệ sinh và kiểm tra đầy đủ." /></Field><div className="form-actions"><Button variant="ghost">Lưu nháp</Button><Button onClick={onDone}>Hoàn thành phiếu <Check size={16}/></Button></div></section></div>
}

function Staff({onAction}:{onAction:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="NHÂN SỰ" title="Quản lý nhân viên" desc="Quản lý tài khoản, vai trò và trạng thái làm việc." action={<Button icon={<Plus size={17}/>} onClick={onAction}>Thêm nhân viên</Button>}/><section className="panel"><div className="filter-row compact"><div className="search-field"><Search size={16}/><input placeholder="Tìm tên, email, số điện thoại..." /></div><select><option>Tất cả vai trò</option><option>Kỹ thuật viên</option><option>Quản lý</option></select></div><div className="table-wrap"><table className="large"><thead><tr><th>Nhân viên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th><th>Ngày tham gia</th><th></th></tr></thead><tbody>{[["Nguyễn Hoàng","nguyen.hoang@fixhub.vn","Kỹ thuật viên","Đang làm việc"],["Lê Quốc B","le.quoc@fixhub.vn","Kỹ thuật viên","Đang làm việc"],["Trần Đức","tran.duc@fixhub.vn","Kỹ thuật viên","Nghỉ phép"],["Phạm Minh","pham.minh@fixhub.vn","Quản lý","Đang làm việc"]].map((r,i)=><tr key={r[0]}><td><div className="person-cell"><div className="avatar">{r[0].split(" ").map(x=>x[0]).slice(-2).join("")}</div><strong>{r[0]}</strong></div></td><td>{r[1]}</td><td>{r[2]}</td><td><Status tone={r[3]==="Đang làm việc"?"green":"amber"}>{r[3]}</Status></td><td>12/03/2026</td><td><button className="more"><MoreHorizontal/></button></td></tr>)}</tbody></table></div></section></div>
}

function ServiceAdmin({onAction}:{onAction:()=>void}) {
  return <div className="animate-in"><PageHead eyebrow="DỊCH VỤ" title="Quản lý dịch vụ" desc="Tạo, cập nhật giá và trạng thái các dịch vụ sửa chữa." action={<Button icon={<Plus size={17}/>} onClick={onAction}>Thêm dịch vụ</Button>}/><div className="admin-service-grid">{services.map(s=><div className="admin-service-card" key={s.name}><div className="service-icon"><s.icon/></div><div><h3>{s.name}</h3><p>{s.desc}</p></div><div className="row-between"><strong>{s.price}</strong><Status tone="green">Đang bán</Status></div><div className="card-actions"><Button variant="soft" icon={<Pencil size={14}/>}>Chỉnh sửa</Button><Button variant="ghost">Tắt dịch vụ</Button></div></div>)}</div></div>
}

function Customers() {
  return <div className="animate-in"><PageHead eyebrow="KHÁCH HÀNG" title="Quản lý khách hàng" desc="Tra cứu thông tin và lịch sử sử dụng dịch vụ."/><section className="panel"><div className="filter-row compact"><div className="search-field"><Search size={16}/><input placeholder="Tìm khách hàng..." /></div><select><option>Tất cả khách hàng</option><option>Khách hàng mới</option><option>Khách VIP</option></select></div><div className="table-wrap"><table className="large"><thead><tr><th>Khách hàng</th><th>Email</th><th>Số điện thoại</th><th>Phiếu sửa</th><th>Tổng chi tiêu</th><th>Trạng thái</th><th></th></tr></thead><tbody>{["Nguyễn Hoàng","Trần Minh K","Lê Hoàng N","Phạm Gia H","Nguyễn Văn A"].map((n,i)=><tr key={n}><td><div className="person-cell"><div className="avatar">{n.split(" ").map(x=>x[0]).slice(-2).join("")}</div><strong>{n}</strong></div></td><td>{n.toLowerCase().replaceAll(" ",".")}@email.com</td><td>09{i+1} 234 567</td><td>{8-i}</td><td>{(3.2-i*.35).toFixed(2)} triệu</td><td><Status tone="green">Hoạt động</Status></td><td><button className="table-action">Xem <ArrowRight size={14}/></button></td></tr>)}</tbody></table></div></section></div>
}

function TicketAdmin() {
  return <div className="animate-in"><PageHead eyebrow="PHIẾU SỬA CHỮA" title="Quản lý phiếu sửa chữa" desc="Tổng hợp phiếu theo kỹ thuật viên, trạng thái và chi phí."/><div className="stats-grid compact-stats">{[{l:"Tổng phiếu",v:"42"},{l:"Đang xử lý",v:"27"},{l:"Chờ báo giá",v:"08"},{l:"Hoàn thành",v:"126"}].map(x=><div className="mini-stat" key={x.l}><span>{x.l}</span><strong>{x.v}</strong></div>)}</div><RepairTickets/></div>
}

function Reports() {
  return <div className="animate-in"><PageHead eyebrow="BÁO CÁO" title="Báo cáo & phân tích" desc="Theo dõi doanh thu, hiệu suất và chất lượng dịch vụ." action={<Button variant="soft">Xuất báo cáo <ArrowRight size={15}/></Button>}/><div className="report-grid"><section className="panel report-main"><div className="panel-head"><div><h3>Doanh thu theo tháng</h3><span>01/2026 — 09/2026</span></div><select><option>Doanh thu</option><option>Số phiếu</option></select></div><div className="big-chart">{[42,55,49,68,61,73,66,82,94].map((h,i)=><div key={i}><i style={{height: h + "%"}}/><span>T{i+1}</span></div>)}</div></section><section className="panel"><div className="panel-head"><h3>Tỷ lệ hoàn thành</h3><BarChart3 size={18}/></div><div className="donut"><div><strong>94%</strong><span>Đúng hạn</span></div></div><div className="legend"><span><i/>Đúng hạn <b>94%</b></span><span><i/>Trễ hạn <b>6%</b></span></div></section><section className="panel"><div className="panel-head"><h3>Dịch vụ phổ biến</h3><MoreHorizontal size={18}/></div>{["Vệ sinh & bảo dưỡng","Cài Windows","Thay keo tản nhiệt","Sửa nguồn"].map((x,i)=><div className="rank-row" key={x}><span>0{i+1}</span><div><strong>{x}</strong><div className="progress"><i style={{width: (88 - i * 16) + "%"}}/></div></div><b>{88-i*16}%</b></div>)}</section></div></div>
}

function SettingsPage() {
  return <div className="animate-in"><PageHead eyebrow="HỆ THỐNG" title="Cài đặt" desc="Tùy chỉnh thông tin cửa hàng và trải nghiệm giao diện."/><div className="settings-grid"><section className="panel"><h3>Thông tin cửa hàng</h3><Field label="Tên cửa hàng"><input defaultValue="FixHub Computer Care"/></Field><Field label="Địa chỉ"><input defaultValue="128 Xuân Thủy, Cầu Giấy, Hà Nội"/></Field><Field label="Hotline"><input defaultValue="1900 6868"/></Field><Button>Lưu thay đổi</Button></section><section className="panel"><h3>Thông báo</h3>{["Lịch hẹn mới","Khách duyệt báo giá","Phiếu hoàn thành","Yêu cầu bảo hành"].map(x=><div className="setting-line" key={x}><div><strong>{x}</strong><span>Nhận thông báo realtime</span></div><label className="switch"><input type="checkbox" defaultChecked/><span/></label></div>)}</section></div></div>
}

function Payment({onDone}:{onDone:()=>void}) {
  return <div><div className="payment-methods"><button className="payment-option selected"><CreditCard/><span><strong>Thẻ ngân hàng</strong><small>Visa / Mastercard / Napas</small></span></button><button className="payment-option"><Smartphone/><span><strong>Ví điện tử</strong><small>MoMo / ZaloPay</small></span></button></div><Field label="Số thẻ"><input placeholder="1234 5678 9012 3456"/></Field><div className="two"><Field label="Ngày hết hạn"><input placeholder="MM/YY"/></Field><Field label="CVV"><input placeholder="•••"/></Field></div><div className="modal-total"><span>Tổng thanh toán</span><strong>1.850.000đ</strong></div><Button onClick={onDone}>Thanh toán 1.850.000đ</Button></div>
}

function Confirm({text,onDone}:{text:string;onDone:()=>void}) {
  return <div className="confirm-modal"><div className="warning-icon"><LogOut/></div><p>{text}</p><div className="form-actions"><Button variant="ghost">Hủy</Button><Button variant="danger" onClick={onDone}>Đăng xuất</Button></div></div>
}

function StaffForm({onDone}:{onDone:()=>void}) {
  return <div><div className="two"><Field label="Họ và tên"><input placeholder="Nguyễn Văn A"/></Field><Field label="Email"><input placeholder="email@fixhub.vn"/></Field><Field label="Số điện thoại"><input placeholder="090..." /></Field><Field label="Vai trò"><select><option>Kỹ thuật viên</option><option>Quản lý</option></select></Field></div><div className="form-actions"><Button variant="ghost">Hủy</Button><Button onClick={onDone}>Tạo nhân viên</Button></div></div>
}

function ServiceForm({onDone}:{onDone:()=>void}) {
  return <div><Field label="Tên dịch vụ"><input placeholder="Tên dịch vụ..." /></Field><div className="two"><Field label="Danh mục"><select><option>Phần cứng</option><option>Phần mềm</option><option>Bảo trì</option></select></Field><Field label="Giá từ"><input placeholder="150000" /></Field></div><Field label="Mô tả"><textarea rows={4} placeholder="Mô tả dịch vụ..." /></Field><div className="form-actions"><Button variant="ghost">Hủy</Button><Button onClick={onDone}>Thêm dịch vụ</Button></div></div>
}

function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}) {
  return <div className="modal-backdrop" onMouseDown={e=>e.currentTarget===e.target&&onClose()}><div className="modal"><div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18}/></button></div><div className="modal-body">{children}</div></div></div>
}
function Field({label,children}:{label:string;children:React.ReactNode}) { return <label className="field"><span>{label}</span>{children}</label> }
function SummaryRow({label,value}:{label:string;value:string}) { return <div className="summary-row"><span>{label}</span><strong>{value}</strong></div> }
function TimelineItem({done,current,title,time,desc}:{done?:boolean;current?:boolean;title:string;time:string;desc?:string}) { return <div className={`timeline-item ${done?"done":""} ${current?"current":""}`}><div className="timeline-dot">{done?<Check size={13}/>:current?<Wrench size={13}/>:null}</div><div><strong>{title}</strong><span>{time}</span>{desc&&<p>{desc}</p>}</div></div> }
function LaptopGlyph(){return <div className="laptop-glyph"><div/><span/></div>}

export default App;
