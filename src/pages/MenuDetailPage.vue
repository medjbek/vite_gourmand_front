<template>
  <div class="vg-page">
    <div class="vg-container">
      <section class="vg-section-light vg-section-border menu-principal">
        <div ref="menuRoot"></div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuRoot = ref(null)

let fetchController = null

function clearMenuRoot() {
  if (menuRoot.value) {
    menuRoot.value.textContent = ''
  }
}

function showLoading() {
  clearMenuRoot()
  const p = document.createElement('p')
  p.textContent = 'Chargement en cours...'
  menuRoot.value.appendChild(p)
}

function showError(message) {
  clearMenuRoot()

  const errorBox = document.createElement('div')
  errorBox.setAttribute('role', 'alert')
  errorBox.className = 'menu-error'
  errorBox.textContent = message

  menuRoot.value.appendChild(errorBox)
}

function createElement(tagName, className, text) {
  const node = document.createElement(tagName)

  if (className) {
    node.className = className
  }

  if (text !== undefined && text !== null) {
    node.textContent = text
  }

  return node
}

/* NORMALISATION API → FRONT */
function createMenuApi(apiMenu) {
  if (!apiMenu) {
    apiMenu = {}
  }

  const menu = {
    id: 0,
    title: 'Menu',
    description: '',
    minimumPeople: 1,
    basePrice: 0,
    stock: null,
    conditions: '',
    themeName: 'Non renseigné',
    diets: [],
    images: [],
    imageUrl: null,
    dishes: [],
  }

  const id = Number(apiMenu.id)
  if (Number.isFinite(id)) {
    menu.id = id
  }

  if (apiMenu.title) {
    menu.title = String(apiMenu.title)
  }

  if (apiMenu.description) {
    menu.description = String(apiMenu.description)
  }

  const minPeople = Number(apiMenu.minimum_people)
  if (Number.isFinite(minPeople)) {
    menu.minimumPeople = minPeople
  }

  const price = Number(apiMenu.base_price)
  if (Number.isFinite(price)) {
    menu.basePrice = price
  }

  if (apiMenu.stock !== undefined && apiMenu.stock !== null && apiMenu.stock !== '') {
    const stockValue = Number(apiMenu.stock)
    if (Number.isFinite(stockValue)) {
      menu.stock = stockValue
    }
  }

  if (apiMenu.conditions) {
    menu.conditions = String(apiMenu.conditions)
  }

  if (apiMenu.theme && apiMenu.theme.name) {
    menu.themeName = String(apiMenu.theme.name)
  }

  if (Array.isArray(apiMenu.diets)) {
    apiMenu.diets.forEach((d) => {
      if (d && d.name) {
        menu.diets.push(String(d.name))
      }
    })
  }

  if (Array.isArray(apiMenu.images)) {
    apiMenu.images.forEach((img) => {
      if (img && img.url) {
        let imgId = null
        if (img.id !== undefined) {
          imgId = img.id
        }

        menu.images.push({
          id: imgId,
          url: String(img.url),
        })
      }
    })
  }

  if (menu.images.length > 0) {
    menu.imageUrl = menu.images[0].url
  }

  if (Array.isArray(apiMenu.dishes)) {
    apiMenu.dishes.forEach((dish) => {
      if (!dish) return

      const allergens = []

      if (Array.isArray(dish.allergens)) {
        dish.allergens.forEach((a) => {
          if (a && a.name) {
            allergens.push(String(a.name))
          }
        })
      }

      let type = 'other'
      if (dish.type) {
        type = String(dish.type)
      }

      let dishId = null
      if (dish.id !== undefined) {
        dishId = dish.id
      }

      let dishName = 'Plat'
      if (dish.name) {
        dishName = String(dish.name)
      }

      let dishDescription = ''
      if (dish.description) {
        dishDescription = String(dish.description)
      }

      menu.dishes.push({
        id: dishId,
        name: dishName,
        description: dishDescription,
        type: type,
        allergens: allergens,
      })
    })
  }

  return menu
}

/* API */
async function loadMenuById(menuId) {
  // Sécurité : s'assurer que fetchController existe
  if (!fetchController) {
    fetchController = new AbortController()
  }

  const API_URL = import.meta.env.VITE_API_URL

  const res = await fetch(`${API_URL}/menus/${menuId}`, {
    signal: fetchController.signal,
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error('Impossible de charger le menu.')
  }

  const data = await res.json()

  let menuData = data
  if (data && data.data) {
    menuData = data.data
  }

  return createMenuApi(menuData)
}

/* AFFICHAGE */
function displayMenu(menu) {
  clearMenuRoot()

  const menuLayout = createElement('div', 'menu-detail')

  /* ---- LEFT ---- */
  const leftColumn = createElement('div', 'menu-detail__left')

  const leftTitle = createElement('h1', 'menu-detail__title', menu.title)

  let descText = 'Description non disponible.'
  if (menu.description) {
    descText = menu.description
  }
  const leftDesc = createElement('p', 'menu-detail__desc', descText)

  const imageWrap = createElement('div', 'menu-detail__image')
  const imageFrame = createElement('div', 'menu-detail__imageFrame')

  function setMainImage(url) {
    imageFrame.textContent = ''

    if (url) {
      const img = document.createElement('img')
      img.className = 'menu-detail__img'
      img.src = url
      img.alt = `Photo du menu ${menu.title}`
      img.loading = 'lazy'
      imageFrame.appendChild(img)
    } else {
      imageFrame.appendChild(createElement('div', 'menu-detail__fallback', 'Image non disponible'))
    }
  }

  setMainImage(menu.imageUrl)
  imageWrap.appendChild(imageFrame)

  // Images secondaires (miniatures)
  if (menu.images.length > 1) {
    const secondaryImgBox = createElement('div', 'secondary-img-box')

    menu.images.forEach((im, index) => {
      const secondaryImgBtn = document.createElement('button')
      secondaryImgBtn.type = 'button'
      secondaryImgBtn.className = 'secondary-img-btn'

      if (index === 0) {
        secondaryImgBtn.classList.add('is-active')
      }

      const secondaryImg = document.createElement('img')
      secondaryImg.className = 'secondary-img'
      secondaryImg.src = im.url
      secondaryImg.alt = `Image ${index + 1}`
      secondaryImg.loading = 'lazy'

      const selectImage = () => {
        setMainImage(im.url)

        secondaryImgBox
          .querySelectorAll('.secondary-img-btn')
          .forEach((b) => b.classList.remove('is-active'))

        secondaryImgBtn.classList.add('is-active')
      }

      secondaryImgBtn.addEventListener('click', selectImage)
      secondaryImgBtn.appendChild(secondaryImg)
      secondaryImgBox.appendChild(secondaryImgBtn)
    })

    imageWrap.appendChild(secondaryImgBox)
  }

  leftColumn.append(leftTitle, leftDesc, imageWrap)

  /* ---- RIGHT ---- */
  const rightColumn = createElement('div', 'menu-detail__content')

  // Infos
  const infoPanel = createElement('div', 'menu-detail__panel')
  infoPanel.appendChild(createElement('h2', 'menu-detail__sectionTitle', 'Informations'))

  const ul = document.createElement('ul')
  ul.className = 'menu-detail__list'

  ul.appendChild(createElement('li', null, `Thème : ${menu.themeName}`))

  if (menu.diets.length > 0) {
    ul.appendChild(createElement('li', null, `Régimes : ${menu.diets.join(', ')}`))
  } else {
    ul.appendChild(createElement('li', null, 'Régimes : Aucun'))
  }

  ul.appendChild(createElement('li', null, `Minimum de personnes : ${menu.minimumPeople}`))
  ul.appendChild(createElement('li', null, `Prix par personne : ${menu.basePrice} €`))

  if (menu.stock === null) {
    ul.appendChild(createElement('li', null, 'Stock : Non renseigné'))
  } else {
    ul.appendChild(createElement('li', null, `Stock : ${menu.stock}`))
  }

  infoPanel.appendChild(ul)

  // Plats
  const dishesPanel = createElement('div', 'menu-detail__panel')
  dishesPanel.appendChild(createElement('h2', 'menu-detail__sectionTitle', 'Plats et allergènes'))

  if (!menu.dishes || menu.dishes.length === 0) {
    dishesPanel.appendChild(createElement('p', null, 'Plats : Non renseigné.'))
  } else {
    const starters = []
    const mains = []
    const desserts = []
    const others = []

    menu.dishes.forEach((dish) => {
      if (dish.type === 'starter') {
        starters.push(dish)
      } else if (dish.type === 'main') {
        mains.push(dish)
      } else if (dish.type === 'dessert') {
        desserts.push(dish)
      } else {
        others.push(dish)
      }
    })

    function displayDishGroup(title, dishes) {
      if (!dishes || dishes.length === 0) {
        return
      }

      dishesPanel.appendChild(createElement('h3', 'menu-detail__subTitle', title))

      const list = document.createElement('ul')
      list.className = 'menu-detail__dishList'

      dishes.forEach((dish) => {
        const li = createElement('li', 'menu-detail__dishItem')

        li.appendChild(createElement('div', 'menu-detail__dishName', dish.name))

        if (dish.description) {
          li.appendChild(createElement('div', 'menu-detail__dishDesc', dish.description))
        }

        if (dish.allergens && dish.allergens.length > 0) {
          li.appendChild(
            createElement(
              'div',
              'menu-detail__allergens',
              'Allergènes : ' + dish.allergens.join(', '),
            ),
          )
        } else {
          li.appendChild(
            createElement('div', 'menu-detail__allergens', 'Allergènes : Aucun indiqué'),
          )
        }

        list.appendChild(li)
      })

      dishesPanel.appendChild(list)
    }

    displayDishGroup('Entrées', starters)
    displayDishGroup('Plats', mains)
    displayDishGroup('Desserts', desserts)
    displayDishGroup('Autres', others)
  }

  // Conditions
  const conditionsPanel = createElement('div', 'menu-detail__panel')
  conditionsPanel.appendChild(createElement('h2', 'menu-detail__sectionTitle', 'Conditions'))

  if (menu.conditions) {
    conditionsPanel.appendChild(createElement('p', null, menu.conditions))
  } else {
    conditionsPanel.appendChild(createElement('p', null, 'Non renseigné.'))
  }

  // bouton commander
  const actions = createElement('div', 'menu-detail__actions')
  const orderBtn = document.createElement('button')
  orderBtn.type = 'button'
  orderBtn.className = 'vg-btn-primary'
  orderBtn.textContent = 'Commander'
  orderBtn.addEventListener('click', () => alert('Commande : à prevoir.'))
  actions.appendChild(orderBtn)

  rightColumn.append(infoPanel, dishesPanel, conditionsPanel, actions)

  menuLayout.append(leftColumn, rightColumn)
  menuRoot.value.appendChild(menuLayout)
}

/* CYCLE DE VIE DU COMPOSANT*/
async function initMenuDetailPage() {
  showLoading()
  fetchController = new AbortController()

  try {
    const menuId = route.params.id
    const menu = await loadMenuById(menuId)
    displayMenu(menu)
  } catch (e) {
    if (e && e.name === 'AbortError') return
    showError(e && e.message ? e.message : 'Une erreur est survenue.')
  }
}

onMounted(initMenuDetailPage)

onBeforeUnmount(() => {
  if (fetchController) {
    fetchController.abort()
  }
  clearMenuRoot()
})
</script>

<style>
/* ===== Layout global ===== */
.menu-detail {
  display: grid;
  grid-template-columns: minmax(320px, 520px) 1fr;
  gap: 22px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

@media (max-width: 900px) {
  .menu-detail {
    grid-template-columns: 1fr;
  }
}

/* ===== Colonne gauche ===== */
.menu-detail__left {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.menu-detail__imageFrame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: #f7f3e6;
}

/* Image principale + miniatures */
.menu-detail__img,
.secondary-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.menu-detail__fallback {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: #281504;
  color: #f7f3e6;
}

/* ===== Miniatures ===== */
.secondary-img-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.secondary-img-btn {
  width: 74px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.secondary-img-btn.is-active {
  border-color: rgba(78, 43, 5, 0.7);
}

/* ===== Colonne droite ===== */
.menu-detail__content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-detail__panel {
  background: #281504;
  color: #f7f3e6;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(247, 243, 230, 0.18);
}

/* Typo titres / sous-titres */
.menu-detail__sectionTitle {
  font-size: 1.15rem;
  margin: 0 0 10px;
  font-weight: 700;
}

.menu-detail__subTitle {
  font-size: 1rem;
  margin: 14px 0 6px;
  font-weight: 700;
}

/* Listes + items */
.menu-detail__list,
.menu-detail__dishList {
  margin: 0;
  padding-left: 25px;
  line-height: 1.5;
}

.menu-detail__dishItem {
  margin: 10px 0;
}

.menu-detail__dishName {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 2px;
}

.menu-detail__dishDesc {
  margin: 0;
  font-size: 0.95rem;
}

.menu-detail__allergens {
  margin-top: 3px;
  font-size: 0.9rem;
}

/* Bouton commander*/
.menu-detail__actions {
  padding-top: 10px;
  border-top: 1px solid rgba(247, 243, 230, 0.18);
}

/* Erreur API */
.menu-error {
  padding: 16px;
  border-radius: 8px;
  background: #fdecea;
  color: #922b21;
  max-width: 600px;
  margin: 24px auto;
}
</style>
