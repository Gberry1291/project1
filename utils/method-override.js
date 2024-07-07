import override from "method-override";

const overrideMiddleware = override((req)=> {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_method"] }] */
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
    return "none"
});

export default overrideMiddleware