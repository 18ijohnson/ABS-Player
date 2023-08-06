import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export async function updateLibraries() {
    const userString = storage.getString('user')
    const userJSON = JSON.parse(userString)

    const libraries = await fetch(`${URL}/api/libraries`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${userJSON.token}`
        }
    }).then(response => response.json())
    .then(json => console.log(json))

    console.log(libraries)
}



async function initialSetup(token) {
    console.log('Initial Setup')

    global.libraries = await fetch(`${URL}/api/libraries`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${token}`
        }
    })

    
}