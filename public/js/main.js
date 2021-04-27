const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBubbleTea)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteBubbleTea(){
    const bTeaName = this.parentNode.childNodes[1].innerText
    const bTeaShop = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteBubbleTea', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bubbleTeaNameS': bTeaName,
              'bubbleTeaShopS': bTeaShop
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const bTeaName = this.parentNode.childNodes[1].innerText
    const bTeaShop = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bubbleTeaNameS': bTeaName,
              'bubbleTeaShopS': bTeaShop,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}