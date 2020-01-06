// Abstraction for localStorage so we can swap that out later if we want

module.exports = {
  store: (key, value) => localStorage.setItem(key, value),
  get:   key => localStorage.getItem(key)
}
