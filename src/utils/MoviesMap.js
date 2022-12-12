export default class MoviesMap extends Map {
  constructor(cardMap) {
    super(cardMap);
    this._arr = new Array();
  }

  set(key, value) {
    this._arr.push(key);

    return super.set(key, value);
  }

  getArray(){
    return this._arr;
  }

  filter(searchString) {
    function isInRange(value){
        const where = value.toLowerCase();
        const what = this.toLowerCase();

        return where.includes(what);
    }

    const filteredKeys = this._arr.filter(isInRange, searchString);
    const filteredfArray = new Array();

    filteredKeys.map((item)=>{
        filteredfArray.push(this.get(item));
    });

    return filteredfArray;
  }
}
