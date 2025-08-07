const colors = {
    p: '#388e3c',
    div: '#1565c0',
    span: '#53935',
    section: '#f67809',
    ul: '#5e35b1',
    ol: '#fbc02d',
    header: '#d81b60',
    nav: '#64dd17',
    main: '#00acc1',
    footer: '#304ffe',
    form: '#9f6581',
    body: '#25b6da',
    padrao: '#616161',
    getcolor(tag) {
        return this[tag]  ? this[tag] : this.padrao
    }
}
document.querySelectorAll('.tag').forEach(elemento => {
    const tagName = elemento.tagName.toLocaleLowerCase()
    elemento.style.borderColor = colors.getcolor(tagName)
    if (!elemento.classList.contains('nolabel')) {
        const label = document.createElement('label')
        label.style.backgroundColor = colors.getcolor(tagName)
        label.innerHTML = tagName
        elemento.insertBefore(label, elemento.childNodes[0])
    }
})