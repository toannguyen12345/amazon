const DealsNav = () => {
  return (
    <div className="bg-[#f7f7f7] border-b border-[#e7e7e7] py-2">
      <div className="px-5">
        <nav
          className="flex items-center flex-wrap"
          style={{ columnGap: '40px' }}
        >
          <a
            href="#"
            className="text-[15px] font-semibold capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Today's Deals
          </a>
          <a
            href="#"
            className="text-[15px] font-medium capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Coupons
          </a>
          <a
            href="#"
            className="text-[15px] font-medium capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Renewed Deals
          </a>
          <a
            href="#"
            className="text-[15px] font-medium capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Outlet
          </a>
          <a
            href="#"
            className="text-[15px] font-medium capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Amazon Resale
          </a>
          <a
            href="#"
            className="text-[15px] font-medium capitalize no-underline text-[#333] py-2 hover:text-[#0066cc]"
          >
            Grocery Deals
          </a>
        </nav>
      </div>
    </div>
  );
};

export default DealsNav;
