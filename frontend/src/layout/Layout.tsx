export default function Layout({ children, dark, setDark }: any) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <div className="flex-shrink-0">
        {children && null}
      </div>

      {/* REAL SIDEBAR + CONTENT */}
      <div className="flex w-full">

        {/* Sidebar will come from App wrapper */}
        {children}

      </div>

    </div>
  );
}