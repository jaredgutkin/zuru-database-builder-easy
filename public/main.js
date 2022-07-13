document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry(){
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                set: document.getElementsByName('set')[0].value,
                setName: document.getElementsByName('setName')[0].value,
                seriesNo: document.getElementsByName('seriesNo')[0].value,
                item: document.getElementsByName('item')[0].value,
                itemNo: document.getElementsByName('itemNo')[0].value,
                itemName: document.getElementsByName('itemName')[0].value,
                brandName: document.getElementsByName('brandName')[0].value,
                image: document.getElementsByName('image')[0].value,
                rarity: document.getElementsByName('rarity')[0].value,
                specialFeature: document.getElementsByName('specialFeature')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}

async function deleteEntry() {
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })

        })
        const data = await response.json()
        location.reload()
    } catch(err){
        console.log(err)
    }
}