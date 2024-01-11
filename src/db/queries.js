import { geneateArticleCoverName } from "../utils";
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

export async function insertArticle (article) {
    const { data:response, error } = await supabase
    .from('articles')
    .insert(article)
    if (error) {
        return error;
    } else {
        return response;
    }
}

export async function uploadArticleCover (avatarFile, filename) {
    
    const { data, error } = await supabase
      .storage
      .from('content')
      .upload(`article-covers/${filename}.jpg`, avatarFile, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
        return error
    } else {
        return data
    }
}


export async function getArticleCoverUrl (path) {
    const { data } = supabase
    .storage
    .from('content')
    .getPublicUrl(`${path}`)

    return data
}

export async function updateArticle (id, updateDataObject) {
    const { data, error } = await supabase
    .from('articles')
    .update(updateDataObject)
    .eq('_id', id)

    if (error) {
        return error
    }
}

export async function removeArticleCover (existingFileName) {


    const { data, error } = supabase
    .storage
    .from('content')
    .remove(`article-covers/${existingFileName}`)

    if (error) {
        return error
    } else {
        return data
    }

}