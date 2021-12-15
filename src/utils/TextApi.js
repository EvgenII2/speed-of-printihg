class TextApi {
    constructor(options) {
        this.options = options;
        this.baseUrl = this.options.baseUrl;
    }

    getText() {
        return fetch(`${this.baseUrl}`)
            .then(response => response.json())
    }
}

const textApi = new TextApi({
    baseUrl: "https://baconipsum.com/api/?type=meat-and-filler&paras=1",
});

export default textApi;
