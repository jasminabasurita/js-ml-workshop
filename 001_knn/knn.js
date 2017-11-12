const aSyncLog = (...args) => setTimeout(() => args.forEach(arg => console.log(arg)), 5000)

class KNN {
	constructor (kSize){
		this.kSize = kSize;
		this.points = [];
	}

	train(data){
		this.points = this.points.concat(data);
	}

	predictSingle(vector){

		var result = this._distances(vector, this.points);
		result = this._sorted(result);
		result = this._majority(this.kSize, result);
		return result;
	}

	predict(arrVec){
		const t = this;
		return arrVec.map(vec => t.predictSingle(vec))
	}

	score(arrVec){
		const t = this;
		var classifications = arrVec
			.map(arr => arr[1])
			.reduce((a, b) => a + b);

		var vectors = t.predict(arrVec.map(arr => arr[0]))
			.reduce((a, b) => a + b);

		return vectors > classifications ? classifications / vectors : vectors / classifications;

	}

	_distance(vec1, vec2){
		const t = this;
		var distance = 0;
		if (vec1.length !== vec2.length) return null;
		for (let i = 0; i < vec1.length; i++){
			distance += Math.abs(vec1[i] - vec2[i]);
		}
		return distance;
	}

	_distances(vec, tData){
		var distances = [];
		tData.forEach(data => {
			distances.push([this._distance(vec, data[0]), data[1]])
		})
		return distances;
	}

	_sorted(data){
		const t = this;
		data = data.sort((a, b) => a[0] - b[0])
		return data.map(arr => arr[1])
	}

	_majority(num, arr){
		const t = this;
		arr = arr.slice(0, num)
		function mode(arr) {
			var numMapping = {};
			var greatestFreq = 0;
			var result;
			arr.forEach(number => {
					numMapping[number] = (numMapping[number] || 0) + 1;

				 if (greatestFreq < numMapping[number]) {
							greatestFreq = numMapping[number];
							result = number;
					}
			});
			return +result;
		}
		return mode(arr);
	}


}

module.exports = KNN

