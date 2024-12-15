const scrollContainer = document.querySelector('.scroll-container');
const halfContainer = scrollContainer.clientWidth / 2

let targetIndex
function scrollHandler(e) {
    const atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
    const timeOut = atSnappingPoint ? 0 : 150; //see notes
    styleCards()
    clearTimeout(e.target.scrollTimeout); //clear previous timeout

    e.target.scrollTimeout = setTimeout(function() {
        console.log('Scrolling stopped!');
        updatedTargetCard()
    }, timeOut);
}

scrollContainer.addEventListener('scroll', scrollHandler);

const cards = Array.from(document.querySelectorAll('.card'))
console.log(cards[2].getBoundingClientRect())
const cardWidth = cards[0].getBoundingClientRect().width
const ghostElements = 2
const leftMin = cardWidth * ghostElements
const rightMin = cardWidth * (cards.length - 1)  - leftMin

let closestCard
let closestDistance = 9999
let closestIndex

function styleCards(){
    closestDistance = 9999
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = cardCenter - halfContainer
        const absDistance = Math.abs(distance)
        if(Math.abs(absDistance) < closestDistance) {
            closestCard = card
            closestDistance = absDistance
            closestIndex = index
        }
        card.classList.remove("selected-card")
        // if(distance == 0) {
        //     card.classList.add("test")
        // } else {
        //     card.classList.remove("test")
        //     console.log("index", index, "distance", distance)
        // }
        card.style.setProperty('--i', distance);
        card.style.setProperty("--r",(Math.round((distance - distance / 4) * 10)) / 10 + "px")

    })

    cards.forEach((card,index)=> {
        const z = cards.length + (index < closestIndex ? index : 2*closestIndex - index)
        card.style.setProperty('--z',z);
    })
    closestCard.classList.add("selected-card")
    
    // console.log(cards[0].getBoundingClientRect().x)
}

function updatedTargetCard(){
    if(closestIndex < ghostElements) {

        scrollContainer.scrollTo({left: leftMin, behavior: "smooth"})
    } else if(closestIndex + 1> cards.length - ghostElements) {
        console.log("scroll")
        scrollContainer.scrollTo({left: rightMin, behavior: "smooth"})
    }
    // cards.forEach((card, index) => {
    //     console.log("closestIndex", closestIndex)
    //     const cardRect = card.getBoundingClientRect();
    //     const cardCenter = cardRect.left + cardRect.width / 2;
    //     const distance = cardCenter - halfContainer
    //     // Detect end scroll here

    // })


}