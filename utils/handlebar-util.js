const helpers = {
    if_eq(a, b, opts) {
        if (a === b){
            return opts.fn(this);
        }
        return opts.inverse(this);
    }
}

export default helpers