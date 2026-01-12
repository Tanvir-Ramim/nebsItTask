

const Home = () => {
  
  return (
    <div className="@container">
      <div className="flex   @xl:flex-row flex-col @xl:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          {/* <div className="md:px-4 px-3 border border-gray-300 md:py-4 py-2 bg-white   rounded-xl flex items-center justify-center">
            <IconSvg name={"user"}></IconSvg>
          </div> */}

          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-bold text-gray-900 leading-tight">
              Notice Mangement
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-tight mt-1">
              Manage your time logs
            </p>
          </div>
        </div>

        <div className="flex h-fit @xl:mt-0 mt-6 gap-4">
          <button
            className={`
        flex items-center  sm:gap-2 gap-0.5 rounded-lg  font-semibold  sm:text-base  cursor-pointer text-sm 
     bg-blue-600 @sm:text-base text-[13px] text-white
      sm:px-4 px-2  sm:py-2 py-1.5
        transition-all duration-200 
        hover:opacity-90
    
      `}
          >
            <span className="flex items-center"></span>

            <span className="">Create Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
