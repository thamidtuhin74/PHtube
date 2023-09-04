
let fetchData;

const fetchcatagories = async (type) => {
  // const url = `https://openapi.programming-hero.com/api/ai/tools`
  const url = `https://openapi.programming-hero.com/api/videos/category/1000`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data.data);

  displayCatagories(data.data,type)
  // fetchData = data.data.tools;
  fetchData = data.data;

  console.log(data.data);

}

let seeAll = false;
const seeMoreHandler = (x) =>{
  console.log(x);
  seeAll = x;
  fetchcatagories();
}

const shortDateBtn = () => {
  fetchData.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
  displayCatagories(fetchData, true);
};


const displayCatagories = (items,type) => {

  const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
      // loaderSection.classList.remove('hidden')
    }
    else {
      loaderSection.classList.add('hidden')
    }
  }
  toggleSpinner(true);
  const itemsContainer = document.getElementById('itemsid')
  itemsContainer.innerHTML = ''

  const see=document.getElementById('seeMore');
  see.addEventListener('click', function() {
    // Change the button text
    see.textContent = 'Show Less';
});

  console.log(seeAll);
  // const seeMoreHandler = (x) =>{
  //   console.log(x);
  // }
  console.log(see);
    // if(items.length>=6){
    //   items = items.slice(0, 6)
    //   see.classList.remove('hidden')
    // }
    // else{
    //   items = items.slice(0, 12)
    //   see.classList.add('hidden')
    // }
    
  console.log('seeAll : '+seeAll);

    if(!seeAll){
      items = items.slice(0, 8)
      see.classList.remove('hidden')
    }
    else{
      items = items.slice(0, 12)
      // see.textContent = 'Clicked!';
      // see.classList.add('hidden')
    }

    
  items.forEach(item => {
    const itemsDiv = document.createElement('div')

    itemsDiv.classList.add = 'card w-100 bg-base-100 shadow-xl h-full '
    itemsDiv.innerHTML = `
        <figure><img class="h-[200px] w-[312px] rounded-md" src="${item.thumbnail}" alt="Shoes" /></figure>

            <div class="card-body">
             
              <figcaption class="flex  space-x-3">
                <img class="rounded-full w-9 h-9" src="${item.authors[0].profile_picture}" alt="profile picture">
                <div class="space-y-0.5 font-bold leading-6 text-[#171717] text-base text-left">
                    <div>${item.title}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">${item.authors[0].profile_name} ${ item.authors[0].verified ? `<i class="fa-solid fa-circle-check text-sky-500"></i>` : ` ` }</div>
                    <p>${item.others.views} views</p>

                </div>
              </figcaption>  
            </div>
        `


        itemsContainer.appendChild(itemsDiv)
        toggleSpinner(false)
  })

}



const modalsfetch = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(url)
  const data = await res.json()
  // console.log(data.data);

  modals(data.data);
  console.log(data.data);

}

const modals = (id) => {

  const modalBody = document.getElementById("modalbodyId")
  // const modalDiv = document.createElement("div")

  // console.log(id?.integrations[0]);
  modalBody.classList.add = "relative flex w-[1000px]"
  modalBody.innerHTML = `
  <label for="my-modal-3" class="z-10 btn btn-sm btn-circle bg-red-400 absolute right-0 top-2">✕</label>
    
  <div class="flex">
  <div><div class="card w-full bg-base-100 shadow-xl  rounded-lg">
      
      <div class="card-body bg-red-200 rounded-lg">
        
        <p class="font-bold">${id.description}</p>
      <div class="flex">
          
          <div class="bg-white m-4 rounded-lg">

              <p class="text-rose-400 p-3 font-bold">${id.pricing? `<p>${id?.pricing[0]?.price} ${id?.pricing[0]?.plan}</p>` : 'free of cost'}</p>
          </div>
          <div class="bg-white m-4 rounded-lg">

              <p class="text-rose-400 p-3 font-bold">${id.pricing? `<p>${id?.pricing[1]?.price} ${id?.pricing[1]?.plan}</p>` : 'free of cost'}</p>
          </div>
          <div class="bg-white m-4 rounded-lg">

              <p class="text-rose-400 p-3 font-bold">${id.pricing? `<p>${id?.pricing[2]?.price} ${id?.pricing[2]?.plan}</p>` : 'free of cost'}</p>
          </div>
          
      </div>

      <div class="flex justify-around">
          <div>
              <h2 class="font-bold">Features</h2>
              <ol class="list-disc">
              <li>${id.features[1].feature_name}</li>
              <li>${id.features[2].feature_name}</li>
              <li>${id.features[3].feature_name}</li>
              </ol>
          </div>
          <div>
              <h2 class="font-bold">Integrations</h2>
              <ul class="list-disc">

              ${id.integrations?`${id.integrations?.map(integration => `<li>${integration}</li>`).join(' ')}`:'no data found'
              }
              

              </ul>
          </div>
      </div>
        
      </div>
    </div></div>
    <div><div class="card w-100 bg-base-100 shadow-xl">
      <figure><img class="w-full" src="${id.image_link[0]}" alt="Shoes" /></figure>
      
      <p class="opacity-75 absolute right-5 top-5">${id.accuracy.score ? `<button type="button" class="btn bg-red-400 btn-danger btn-sm">${id.accuracy.score * 100 + '% Accuracy'}</button>` : ''}
      </p>
      <div class="card-body">
        <h2 class="card-title">${id.input_output_examples? id.input_output_examples.map(input_examples => `<li>${input_examples.input}</li>`).join(''): 'No Questions Available'}</h2>
        <p>${id.input_output_examples? id.input_output_examples.map(output_examples => `<li>${output_examples.output}</li>`).join(''): 'No! Not Yet! take a break!!!'}</p>
       
      </div>
    </div></div>
  </div>


    `





}

const seeMore=()=>{
  fetchcatagories('seeAll');


}



fetchcatagories()


