import Sidebar from "./Sidebar";

function Layout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "220px",
          padding: "20px",
          width: "100%",
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
<div
  style={{
    marginLeft: "240px",
    padding: "30px",
    width: "100%",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  }}
></div>