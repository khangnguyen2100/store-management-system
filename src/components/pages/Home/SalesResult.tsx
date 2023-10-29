function SalesResult() {
  return (
    <div className='px-5 py-6 shadow-lg'>
      <h3 className='text-sm uppercase'>Kết quả bán hàng hôm nay</h3>
      <div className='mt-5 flex gap-x-5'>
        <div className='flex items-center gap-x-4 px-4'>
          <i className='fa-solid fa-circle-dollar text-3xl text-[#0070F4]'></i>
          <div className='items-left flex flex-col justify-center'>
            <span className='text-[#0070F4]'>0</span>
            <span>Doanh thu</span>
          </div>
        </div>
        <div className='flex items-center gap-x-4 border border-transparent border-l-black px-4'>
          <div className='h-[30px] w-[30px] rounded-full bg-[#FF8800] text-center'>
            <i className='fa-duotone fa-reply-all align-middle text-base text-white'></i>
          </div>
          <div className='items-left flex flex-col justify-center'>
            <span className='text-[#FF8800]'>0</span>
            <span>Trả hàng</span>
          </div>
        </div>
        <div className='flex items-center gap-x-4 border border-transparent border-l-black px-4'>
          <i className='fa-sharp fa-solid fa-circle-up text-3xl text-[#00B63E]'></i>
          <div className='items-left flex flex-col justify-center'>
            <span className='text-[#00B63E]'>11%</span>
            <span>So với cùng kì tháng trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesResult;
