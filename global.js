import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export async function updateLibraries() {
    const URL = storage.getString('serverURL')

    const userString = storage.getString('user')
    const userJSON = JSON.parse(userString)

    const libraries = await fetch(`${URL}/api/libraries`, {
        method: 'GET',
        headers: {
        "Authorization": `Bearer ${userJSON.token}`
        }
    })
    .then(response => response.json())
    .then(json => json.libraries)

    storage.set('libraries', JSON.stringify(libraries))
    storage.set('librariesUpdated', Date.now().toString())
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