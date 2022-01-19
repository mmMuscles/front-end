import Auth from "../../components/Auth/Auth";

export default function Home() {
  return (
    <>
      <main className='min-h-screen grid grid-cols-4 grid-rows-3 bg-black'>
        
        <h2 className='text-white row-start-1 col-start-2'>mmmuscles</h2>

        <section className='m-8 col-start-2'>
          <span>weekly view</span><img alt='week_view' src='week_view.png' width='200' />
          <span>daily view</span><img alt='day_view' src='day_view.png' width='200'/>
        </section>

        <section className='m-8 text-white'>
          <p>The goal is to build an awesome and flexible fitness manager, along with a comprehensive and complete list of exercises. Simple to view, simple to use, made by simple people for simple people. Mmm, so great!</p>
        </section>


        <section className='m-8 text-white'>
        <span>login </span>
        <label>email<input/></label>
        <label>password<input/></label>
        </section>
        <Auth/>
      </main>
    </>
  );
}
