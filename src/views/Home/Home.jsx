import './Home.css'
import Auth from "../../components/Auth/Auth";

export default function Home() {
  return (
    <>
      <main className='min-h-screen grid grid-cols-4 grid-rows-3'>
        
        <h1 className='text-white font-black text-5xl row-start-1 row-span-3 col-start-1 col-span-4 bg-black p-5 home-back'>mmmuscles</h1>

        <section className='m-8 p-10 bg-white bg-opacity-80 row-start-1 row-span-2 col-start-3 col-span-2 text-slate-600 flex items-top rounded'>
          <article className=''>
          <p><b>mmmuscles</b> is an awesome and flexible fitness manager. Schedule your day with a simple to use calendar. Select your workouts from a comprehensive and complete list of exercises. Simple to view, simple to use, made by simple people for simple people.</p>
          <br/>
          <p>Create an account today and start your journey to fitness nirvana.</p>
          <br/>
          <p>Mmm, so great!</p>
          </article>
        </section>

        {/* <section className='m-8 p-10 row-start-2 row-span-1 col-start-3 col-span-2 flex flex-col text-white text-sm font-medium justify-center'>
          <span>weekly view</span><img alt='week_view' src='week_view.png' width='250' />
          <span>daily view</span><img alt='day_view' src='day_view.png' width='250'/>
        </section> */}

        <section className='m-8 row-start-3 col-start-1 col-span-4 flex justify-center'>
          <Auth/>
        </section>
        
      </main>
    </>
  );
}
