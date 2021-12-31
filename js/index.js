document.addEventListener("DOMContentLoaded", ()=>{
 const form = document.querySelector('#github-form')
 
  
 form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const input = form.querySelector('#search').value
    console.log(input)     
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then(res=>res.json())
    .then(res=>{
        let arr = res.items
        let obj = arr[0]
        let img = document.createElement('img')
        img.setAttribute("src", obj.avatar_url)
        img.style.borderRadius = "50%"
        let h2 = document.createElement('h2')
        h2.textContent = obj.login
        let p = document.createElement("p")
        p.innerHTML = `<a href="${obj.html_url}" target="_blank">${obj.html_url}</a>`
        let li = document.createElement("li")
        let ulUsers = document.querySelector("#user-list")
        li.appendChild(img)
        li.appendChild(h2)
        li.appendChild(p)
        ulUsers.appendChild(li)
        let container = document.querySelector('#github-container')
        container.style.display = "block"


        //making a request when result is clicked
            ulUsers.addEventListener("click", ()=>{
                    
            fetch(`https://api.github.com/users/${input}/repos`)
            .then(res=>res.json())
            .then(res=>{
                  for(let obj of res){
                    
                    let ulRepos = document.querySelector("#repos-list") 
                    let li = document.createElement("li")
                    li.innerHTML =`<ul>
                    <li>${obj.name}</li>
                    <li><a href=" ${obj.html_url}"  target="_blank">${obj.html_url}</a></li>
                    </ul>`
                     
                     ulRepos.appendChild(li)
                   
                }
            })
        })

            
    })
    
 })


})