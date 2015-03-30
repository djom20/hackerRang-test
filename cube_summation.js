function processData(input) {
    //Enter your code here
    $solver.init('current');
}

window.$solver = {
	matrix: [0,0,0],
	cases: 	0,
	n: 	0,
	m: 	0,

	init:function(type){
		this.log('Declare Vars.');

		if(type == 'current'){
			this.log(this.matrix);

			// this.cases = prompt("Please enter 1 number");
			this.cases = 1;
			if(this.validateInput(this.cases)){
			    while(this.cases--) {
			    	this.log('Case: ' + this.cases);
			        this.process();
			    }

			    // return 0;
			    this.log('Finish');
		    } else {
		    	this.init();
		    }

		} else if(type == 'test'){
			// Here code of tests
			this.testing();
		}
	},
	process:function(){
		this.n = prompt("Please enter 1 number");
		if(this.validateInput(this.n)){
			this.log('N: ' + this.n);
	    }

	    this.m = prompt("Please enter other 1 number");
		if(this.validateInput(this.m)){
			this.log('M: ' + this.m);
	    }

	    if(this.matrix.length == 0){
	    	this.log('The matrix is empty');
	    }
	},
	validateInput:function(n){
		if(n != ('' && null)){
			n = parseInt(n);
			if(typeof n == 'number'){
				if(n > 0){
					return true;
				} else {
					this.log('La entrada debe ser mayor a cero.');
				}
			}
		}else{
			this.log('La entrada no puede ser nula o vacia.');
		}

		return false;
	},
	sum:function(){
		
	},
	update:function(n,x,y,z,val){
		
	},
	testing:function(){
		this.cases = prompt("Please enter number of test");
		if(this.validateTestInput(this.cases)){
			while(this.cases--) {
		    	this.log('Case: ' + this.cases);
		        this.process();
		    }
	    } else {
	    	this.init();
	    }
	},
	validateTestInput:function(){
		if(n != ('' && null)){
			n = parseInt(n);
			if(typeof n == 'number'){
				if(n > 1){
					if(n <= 20){
						return true;
					} else {
						this.log('La entrada debe ser menor a 50.');
					}
				} else {
					this.log('La entrada debe ser mayor a uno.');
				}
			}
		}else{
			this.log('La entrada no puede ser nula o vacia.');
		}

		return false;
	},
	log:function(input){
		console.log(input);
	}
};