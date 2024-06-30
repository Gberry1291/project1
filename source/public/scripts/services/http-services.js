export default async function MakeRequest(path,body){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {
    method: 'POST',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(body)
    };
    const myRequest = new Request(path, myInit);
    const response = await fetch(myRequest);
    const movies = await response.json();
    return movies
}