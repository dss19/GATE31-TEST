const postsList = document.querySelector('.posts__list')
const postsInput = document.querySelector('.posts__input')

const state = {
    posts: [],
    visiblePosts: [],
    url: ''
}

const createPost = post => `
    <div class="post">
        <input class="checkbox" type="checkbox" name="" id="">
        <label class="label" for=""></label>
        <div class="post__text">${post.body}</div>
        <div class="post__title">${post.title}</div>
    </div>
`

function getPostsRequest() {
    return fetch("https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=9")
    .then(res => res.json())
    .then(posts => state.posts = state.posts.concat(posts))
    .then(() => state.visiblePosts = state.posts)
}


const fillPostsList = posts => {
    postsList.innerHTML = '';

    if (posts.length) {
        posts.forEach(post => postsList.innerHTML += createPost(post))
    }
}

window.addEventListener('load', async () => {
    await getPostsRequest();
    fillPostsList(state.visiblePosts);
})

const search = (items, term) => {
    if (term.length === 0) {
        return items;
    }

    return items.filter((item) => {
        return item.title.indexOf(term) > -1;
    })
}

postsInput.addEventListener('change', () => {    
    state.url = postsInput.value;
    state.visiblePosts = search(state.posts, state.url);
    fillPostsList(state.visiblePosts);
    history.pushState(state, '', `./search=${state.url}`);
})

window.addEventListener('popstate', e => (e.state !== null) 
    ? fillPostsList(e.state.visiblePosts)
    : fillPostsList(state.posts)    
)