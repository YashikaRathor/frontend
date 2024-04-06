import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Cart from '../components/Cart';


export default function Home() {
  const [search,setsearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      // Fetch food items
      const responseItems = await fetch("http://localhost:3001/api/fooditem", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        }
      });
      const itemsData = await responseItems.json();

      // Fetch food categories
      const responseCategories = await fetch("http://localhost:3001/api/foodcategory", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        }
      });
      const categoriesData = await responseCategories.json();

      // Set state with fetched data
      setFoodCat(categoriesData?.data);
      setFoodItem(itemsData?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
  <div className="carousel-inner" id='carousel'>
 <div className='carousel-caption' style={{zIndex : "10"}} >
 <div className="d-flex justify-content-center">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
          <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
        </div>
 </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300x300?pizza" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300?pastry" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300x300?burger" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      <div className='container'>
        {foodCat.length !== 0 ? (
          <div className='row mb-3'>
            {foodCat.map((category) => (
              <div key={category.id} className='col-12'>
                <div className='fs-3 m-3'>{category.CategoryName}</div>
                <hr />
                <div className=''
                style={{
                  display:"flex",
                  flexWrap:"wrap",
                  gap:"20px",
                  justifyContent:"space-evenly"

                }}
                >
                  {foodItem.length !== 0 ? (
                    foodItem.filter((item) =>( item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filterItem) => {
                        // Concatenate options into a single string
                        console.log('filterItems:-',filterItem)
                        // const options = `${filterItem["options__regular"]} ${filterItem["options__medium"]} ${filterItem["options__large"]} ${filterItem["options__half"]} ${filterItem["options__full"]}`;
                        const keysToInclude = ['regular', 'medium', 'large', 'half', 'full'];
                        let options = {};
                        
                        keysToInclude.forEach(key => {
                          if (filterItem.hasOwnProperty(key)) {
                            options[key] = filterItem[key];
                          }
                        });
                        
                        console.log("options :-",options)
                        return (
                          <div key={filterItem.id} className='col-12 col-md-6 col-lg-3'>
                            <Cart 
                           foodItem = {filterItem}
                           options = {options}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No categories found"
        )}
      </div>
      <Footer /> 
    </div>
  );
}
