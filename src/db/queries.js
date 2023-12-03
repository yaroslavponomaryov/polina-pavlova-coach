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

export async function fetchAllArticles () {
    const { data:articles, error:fetchingError } = await supabase
        .from('articles')
        .select()

    if (fetchingError) {
        return fetchingError
    } else {
        return articles
    }
}

export async function getArticleById (id) {
    
    const { data:blogArticle, error } = await supabase
    .from('articles')
    .select()
    .eq('_id', id)
    if (error) {
        return error
    } if (blogArticle.length === 0) {
        throw {code: '404', details: null, hint: null, message: 'Not found'}
    }
    else {
        return blogArticle
    }
}