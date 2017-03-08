describe('Markdown plugin', function() {
    const Vue = require('vue');

    Vue.use(require('plugins/markdown'));
    Vue.config.async = false;

    afterEach(function() {
        fixture.cleanup();
    });

    /**
     * Remove invisible nodes generated by Vue.js
     */
    function strip(el) {
        [...el.childNodes].forEach(function(node) {
            const is_comment = node.nodeType === Node.COMMENT_NODE;
            const is_empty_text = node.nodeType === Node.TEXT_NODE && !/\S/.test(node.nodeValue);
            if (is_comment || is_empty_text) {
                node.parentNode.removeChild(node);
            }
        });
        return el;
    }

    describe('markdown filter', function() {
        function el(text) {
            const vm = new Vue({
                el: fixture.set('<div>{{{text | markdown}}}</div>')[0],
                replace: false,
                data: {
                    text: text
                }
            });
            return strip(vm.$el);
        }

        it('should render empty string as ""', function() {
            expect(el('').childNodes).to.be.emtpy;
        });

        it('should render null value as ""', function() {
            expect(el(null).childNodes).to.be.empty;
        });
        it('should render undefined value as ""', function() {
            expect(el(undefined).childNodes).to.be.empty;
        });

        it('should markdown content', function() {
            expect(el('**aaa**')).to.have.html('<p><strong>aaa</strong></p>');
        });
    });

    describe('markdown directive', function() {
        function el(text) {
            const vm = new Vue({
                el: fixture.set('<div v-markdown="text"></div>')[0],
                data: {
                    'text': text
                }
            });
            return strip(vm.$el);
        }

        it('should render empty string as ""', function() {
            expect(el('').childNodes).to.be.emtpy;
        });

        it('should render null value as ""', function() {
            expect(el(null).childNodes).to.be.empty;
        });
        it('should render undefined value as ""', function() {
            expect(el(undefined).childNodes).to.be.empty;
        });

        it('should markdown content', function() {
            expect(el('**aaa**')).to.have.html('<p><strong>aaa</strong></p>');
        });
    });
});
