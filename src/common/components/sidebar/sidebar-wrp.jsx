export const SidebarWrapper = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 h-screen overflow-hidden flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {children}
      </div>
    </>
  );
};
