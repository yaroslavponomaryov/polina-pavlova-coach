import { fetchUser } from "./queries"

export async function accessCheck (username, password){

    const user = await fetchUser(username)

    if (user.length === 1) {
        if (user[0].password === password) {
            return user[0]
        } else {
            return false
        }
    } else {
        return false
    }
}


export function filterContent (array, id) {
    return array.filter(sectionContent=>sectionContent._id===id)[0]

}
