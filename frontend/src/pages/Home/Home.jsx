import React from 'react'
import Navbar from '../../components/Navbar';
import "./Home.css"; 
function Home() {
  return (
    
    <div className='HomeContainer'>
    <Navbar/>
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

      <div className='wrapper'>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Get Started with Smart Sifarish</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Get rid from the day to day hassle of paperworks. Apply your applications via Smart Sifarish</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
      </div>
      </div>
    </div>

{/* <div className='carouselWrapper'>
    <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/images/smart1.png" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/images/apply1.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/images/apply2.jpg" className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div> */}
 
 {/* <div className='carouselWrapper'>
  <div id="carouselExample" className="carousel slide">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="/images/smart1.png" className="d-block w-100" alt="..." />
      </div>
      <div className="carousel-item">
        <img src="/images/apply1.jpg" className="d-block w-100" alt="..." />
      </div>
      <div className="carousel-item">
        <img src="/images/apply2.jpg" className="d-block w-100" alt="..." />
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div> */}


<div className='carouselWrapper'>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/smart1.png" className="d-block w-100 rounded-lg" alt="..." style={{ height: '300px' }} />
              </div>
              <div className="carousel-item">
                <img src="/images/apply1.jpg" className="d-block w-100 rounded-lg" alt="..." style={{ height: '300px' }} />
              </div>
              <div className="carousel-item">
                <img src="/images/apply2.jpg" className="d-block w-100 rounded-lg" alt="..." style={{ height: '300px' }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>



      </div>
  )
}

export default Home
