import supabase from "./connection";


export async function fetchUser (username) {
    const { data:user, error:fetchError } = await supabase
        .from("users")
        .select()
        .eq('username', username)
    if (fetchError) {
        return fetchError
    } else {
        return user
    }
    
}


export async function fetchAllMainSections () {
    const { data:sections, error:fetchError } = await supabase
        .from("main_page")
        .select()
    if (fetchError) {
        return fetchError
    } else {
        return sections
    }
    
}

export async function updateMainSection (newHeader, newBody, id) {
    const { error } = await supabase
        .from('main_page')
        .update({ title: newHeader, body: newBody })
        .eq('_id', id)
}
