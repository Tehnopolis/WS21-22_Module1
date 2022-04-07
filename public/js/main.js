'use strict'

// Slider
document.querySelectorAll('.slider').forEach(slider => {
	const getCurrentSlide = () => slider.querySelector('.slide.active')
	
	// Is first/last slide
	const isFirstSlide = () => {
		const current = getCurrentSlide()

		return !current.previousElementSibling || !current.previousElementSibling.classList.contains('slide')
	}
	const isLastSlide = () => {
		const current = getCurrentSlide()

		return !current.nextElementSibling || !current.nextElementSibling.classList.contains('slide')
	}

	// Switch slide
	const resetSlide = () => {
		const current = getCurrentSlide()

		// Make current inactive
		current.classList.remove('active')

		// Make first slide active
		slider.querySelectorAll('.slide')[0].classList.add('active')
	}
	const nextSlide = () => {
		const current = getCurrentSlide()

		if(!isLastSlide()) {
			current.classList.remove('active')
			current.nextElementSibling.classList.add('active')
		}
		else
			resetSlide()
	}
	const prevSlide = () => {
		const current = getCurrentSlide()

		if(!isFirstSlide()) {
			current.classList.remove('active')
			current.previousElementSibling.classList.add('active')
		}
	}


	// Next slide
	slider.querySelectorAll('[data-action="next"]').forEach(nextBtn => {
		nextBtn.addEventListener('click', nextSlide)
	})
	// Prev slide
	slider.querySelectorAll('[data-action="prev"]').forEach(nextBtn => {
		nextBtn.addEventListener('click', prevSlide)
	})

	// Auto-switching
	if(slider.hasAttribute('data-auto')) {
		setInterval(nextSlide, slider.getAttribute('data-auto'));
	}
})

// Tabs
const tabs = {
	switchTab: (tabsContainer, name) => {
		// Tabs
		tabsContainer.querySelector('.tab.active').classList.remove('active')
		tabsContainer.querySelector(`.tab[data-tab="${name}"]`).classList.add('active')

		// Pages
		tabsContainer.querySelector('.page.visible').classList.remove('visible')
		tabsContainer.querySelector(`.page[data-page="${name}"]`).classList.add('visible')
	}
}
document.querySelectorAll('.tabs-container').forEach(tabsContainer => {
	// Tabs switching
	tabsContainer.querySelectorAll('.tab[data-tab]').forEach(tab => {
		tab.addEventListener('click', (e) => tabs.switchTab(tabsContainer, e.target.getAttribute('data-tab')))
	})
})
// Switch with other button
document.querySelectorAll('[data-totabs]').forEach(toTabsEl => {
	toTabsEl.addEventListener('click', (e) => {
		e.preventDefault()

		const tabsContainer = document.getElementById(toTabsEl.getAttribute('data-totabs'))
	
		if(tabsContainer) {
			// Scroll to it
			tabsContainer.scrollIntoView()
	
			// Switch tab
			tabs.switchTab(tabsContainer, toTabsEl.getAttribute('data-topage'))
		}
	})
})

// Popups
const openPopup = (name) => {
	const popupEl = document.querySelector(`.popup[data-popup="${name}"]`)
	popupEl.classList.add('visible')

	const fields = popupEl.querySelectorAll('input,select,textarea')
	if(fields && fields.length > 0)
		fields[0].focus()
}
const closePopup = () => {
	document.querySelector(`.popup.visible`).classList.remove('visible')
}

// Input Masks
document.querySelectorAll('[type="phone"]').forEach(phoneInput => {
	const prefixNumber = (str) => {
		switch(str) {
			case '7':
				return '7 ('
			case '8':
				return '8 ('
			case '9':
				return '7 (9'
			default:
				return '7 ('
		}
	}

	phoneInput.addEventListener("input", () => {
		const value = phoneInput.value.replace(/\D+/g, '')
		const numberLength = 11
	  
		let result
		if (phoneInput.value.includes('+8') || phoneInput.value[0] === '8')
		  result = ''
		else
		  result = '+'
		
		for (let i = 0; i < value.length && i < numberLength; i++) {
			switch (i) {
				case 0:
					result += prefixNumber(value[i])
				continue;
				case 4:
					result += ') '
				break;
				case 7:
					result += '-'
				break;
				case 9:
					result += '-'
				break;
			}
			result += value[i]
		}
		phoneInput.value = result
	})
})

// Inputs saving
document.querySelectorAll('input,select,textarea').forEach(inputEl => {
	if(localStorage.getItem(`fdata_${inputEl.getAttribute('name')}`))
		inputEl.value = localStorage.getItem(`fdata_${inputEl.getAttribute('name')}`)

	inputEl.addEventListener('change', (e) => {
		localStorage.setItem(`fdata_${e.target.getAttribute('name')}`, e.target.value)
	})
})

// Forms
document.querySelectorAll('form').forEach(form => {
	form.addEventListener('submit', (e) => {
		e.preventDefault()

		if(e.target.hasAttribute('data-showafter')) {
			openPopup(e.target.getAttribute('data-showafter'))
		}
	})
})