/*переменные*/
import {Api} from './Api.js'
import {Card} from './Card.js'
import {Cardlist} from './Cardlist.js'
import {UserInfo} from './UserInfo.js'
import {FormValidator} from './FormValidator.js'
import {Popup} from './Popup.js'


const addNewCard = document.querySelector(".popup");
const addUserButton = document.querySelector(".user-info__button");
const addCardForm = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_type_name");
const inputLink = document.querySelector(".popup__input_type_link-url");
const addButton = document.querySelector(".popup__button");
const profileSaveButton = document.querySelector(".button_type_edit"); //кнопка edit
const inputAuthor = document.querySelector(".popup__input_type_author");
const inputJob = document.querySelector(".popup__input_type_info");
const actualName = document.querySelector(".user-info__name");
const actualJob = document.querySelector(".user-info__job");
const popupImageContent = document.querySelector('.picture__content');
const popupImage = document.querySelector('.picture')
const imagePicture = document.querySelector('.picture__image')
const addNewInfo = document.querySelector('.popup_type_profile');
const popupFormUser = document.querySelector('.popup__form-user');

const placesList = document.querySelector(".places-list");




/*добавление карточки*/ 
function onFormSubmitHandler(evt) {
  evt.preventDefault();
    const card = new Card (inputName.value, inputLink.value);
    const cardElement = card.create();
    cardList.addCard(cardElement);
   
    card.setEventListeners();
    openAddCardPopup.close();
}
addCardForm.addEventListener("submit", (evt) => {
  onFormSubmitHandler(evt);
});


// попап для добавления новой карточки
const openAddCardPopup = new Popup(addNewCard,"popup_is-opened")
addUserButton.addEventListener('click', () => {
  openAddCardPopup.open();
  formAddCard.reset();
  sendFormAdd.errorReset();
  addButton.setAttribute("disabled", true);
  addButton.classList.remove(`popup__button_disabled`);

})


// попап для смены информации об авторе
const openAughtorForm = new Popup(addNewInfo, "popup_is-opened")
profileSaveButton.addEventListener('click', () => {
  openAughtorForm.open();
  userInfo.actualAughtor(inputAuthor, inputJob, actualName, actualJob);
 
})

//попап для открытия большой картинки
const openBigPicture = new Popup (popupImage, "popup_is-opened");
const openBackgroundPicture = new Popup(popupImageContent, "popup_is-opened")

function popupCardOpen() {
  if (event.target.closest(".place-card__image")){
    imagePicture.src = event.target.style.backgroundImage.slice(5, -2); 
    openBigPicture.open();
    openBackgroundPicture.open();
  }
}
placesList.addEventListener('click', () => {
  popupCardOpen();
  
})


const userInfo = new UserInfo(inputAuthor,inputJob,actualName,actualJob);

function onFormSubmit() {
  api.changeProfile(inputAuthor, inputJob)
  .then( res => {
    userInfo.setUserInfo(res.name, res.about)
    userInfo.updateUserInfo()
    openAughtorForm.close()
    sendFormProfil.errorReset()
  })
  .catch((err)  => {
    console.log(`Ошибка: ${err}`)
  })

}

popupFormUser.addEventListener("submit" ,(evt) => {
  evt.preventDefault();
  onFormSubmit(evt);
})



const formAddCard = document.forms.card;
const formProfil = document.forms.aughtor; 


const sendFormAdd = new FormValidator(formAddCard);
sendFormAdd.setEventListeners();

const sendFormProfil = new FormValidator(formProfil); 
sendFormProfil.setEventListeners();


const api = new Api({
  url:'https://nomoreparties.co/cohort12',
  headers: {
    authorization: '598e7645-6daf-4fc9-bf36-583fc26fb0e8'
  }
})

api.getUserInfo()
.then((res) => {
 userInfo.setUserInfo(res.name, res.about)
 userInfo.updateUserInfo()
 
})
.catch(err => console.log(err))

const createCard = (...args) => new Card(...args);
const cardList = new Cardlist (placesList,api,createCard );
cardList.render()



