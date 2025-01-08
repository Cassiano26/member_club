"use-strict"

import { findClientById } from "./services/findClientById"
import "./styles/global.css"
import "./styles/searchForm.css"

const homeComponent = document.getElementById("home")
const profileNameComponent = document.getElementById("profileName")
const clientSinceComponent = document.getElementById("clientSince")
const totalCutsComponent = document.getElementById("totalCuts")
const historyItemsComponent = document.getElementById("historyItems")
const IdClientComponent = document.getElementById("IdClient")
const marksHistoryComponent = document.getElementById("marksHistory")
const form = document.getElementById("formID")
const input = document.getElementById('inputId')
const remainingCutsComponent = document.getElementById("remainingCuts")
const cutsOfTenComponent = document.getElementById("cutsOfTen")
const barTotalCutsComponent = document.getElementById("barTotalCuts")

input.addEventListener('input', (e) => {
  const regex = /^[0-9\-]*$/
  const value = e.target.value
523-114-876-908
  if(!regex.test(value)) {
    e.target.value = value.replace(/[^0-9\-]/g, "")
    alert("Digite apenas números para localizar usuário")
    
  }
}
)

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const response = await findClientById(e.target.inputId.value)

  if (response?.name) {
    console.log(response.loyaltyCard.cutsNeeded)
    console.log(response.loyaltyCard.totalCuts)
    homeComponent.style.visibility = 'visible'

    profileNameComponent.textContent = response.name

    clientSinceComponent.textContent = `Cliente desde ${response.clientSince}`

    totalCutsComponent.textContent = `${response.loyaltyCard.totalCuts} ${response.loyaltyCard.totalCuts > 1 ? "cortes" : "corte"}`

    historyItemsComponent.innerHTML = response.appointmentHistory.map(item => {
      return `<div>
                <div>
                  <span>${item.date}</span>
                  <span>${item.time}</span>
                </div>
                <img src="./src/assets/Icons.png" alt="">
              </div>`
    }).join('')

    IdClientComponent.textContent = `ID ${response.id}`

    if (response.loyaltyCard.totalCuts == 10) {
      console.log()
      alert("você possui um corte grátis")
      marksHistoryComponent.innerHTML = Array.from( {length: response.loyaltyCard.cutsNeeded}).map((_, index) => {
        return `<div>
                  <img src="./src/assets/markGreen.png" alt="">
                </div>`
      }).join('')
      
    } else {
      marksHistoryComponent.innerHTML = Array.from( {length: response.loyaltyCard.cutsNeeded}).map((_, index) => {
        if (index <= response.loyaltyCard.totalCuts - 1) {
          return `<div>
                    <img src="./src/assets/markGreen.png" alt="">
                  </div>`
        } else if ( index == 9) {
          return `<div>
                    <img src="./src/assets/blackAndWhitePresentIcon.png" alt="">
                  </div>`
        } else {
          return `<div>
                  </div>`
        }
        
      }).join('')
    }

    remainingCutsComponent.textContent = response.loyaltyCard.cutsRemaining

    cutsOfTenComponent.textContent = `${response.loyaltyCard.totalCuts} de 10`

    barTotalCutsComponent.style.setProperty('--custom-width', `${response.loyaltyCard.totalCuts}0%`)


  } else {
    homeComponent.style.visibility = 'hidden'
  }

})