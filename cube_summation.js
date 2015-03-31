	/**
	* Cube Summation
	* http://test.altiviaot.com/hackerrang/
	*
	* @author Ing. Jonathan Olier (djom20)
	*
	*/

	function processData(input) {
    //Enter your code here
    $solver.init('current');
}

window.$solver = {
	matrix: [],
	cases: 	0,
	n: 	0,
	m: 	0,
	command: '',

	init:function(type){
		this.log('Declare Vars.');
		this.log(this.matrix);

		if(type == 'current'){
			this.cases = 1;
			if(this.validateInput(this.cases)){
			    while(this.cases--) {
			    	this.log('Case: ' + this.cases);
			        this.process();
			    }

			    this.log('Finish');
		    } else {
		    	this.init();
		    }

		} else if(type == 'test'){
			this.testing();
		}
	},
	process:function(){
		var x,y,z,x0,y0,z0,value1,value2,val,total = 0;
		var i 	= 5;
		var pos = [0,1,2,3,4,5];

		this.n = prompt("Please enter 1 number");
		if(this.validateInput(this.n)){
			this.log('N: ' + this.n);
	    }

	    this.m = prompt("Please enter other 1 number");
		if(this.validateInput(this.m)){
			this.log('M: ' + this.m);
	    }

	    this.initMatrix(0,101);

	    while(this.m--){
	    	this.command = prompt("Please enter method. Update or Sum?");
	    	if(this.command.toLowerCase() == "update"){
	    		this.update(0,0,0,0,0);
	    	}else if(this.command.toLowerCase() == "sum"){
	    		while(i >= 0){
		    		pos[i] = prompt("Please enter 1 number at position " + i);
					if(this.validateInput(pos[i])){
						this.log('Pos: ' + pos[i]);
				    }
				    i--;
	    		}

	    		x0	= pos[0];
				x	= pos[1];
				y0	= pos[2];
				y	= pos[3];
				z0	= pos[4];
				z	= pos[5];

	            value1 = this.sum(x,y,z) - this.sum(x0-1,y,z) 
	                    - this.sum(x,y0-1,z) + this.sum(x0-1,y0-1,z);

	            value2 = this.sum(x,y,z0-1) - this.sum(x0-1,y,z0-1)
	                    - this.sum(x,y0-1,z0-1)  + this.sum(x0-1,y0-1,z0-1);

	            total = value1 - value2;
	            this.log('Total: ' + total);
	            this.log('Value1: ' + value1);
	            this.log('Value2: ' + value2);
	    	}
	    }
	},
	initMatrix:function(value, max){
		for (var i = 0; i <= max; i++) {
			this.matrix[i] = new Array();
			for (var j = 0; j <= max; j++) {
				this.matrix[i][j] = new Array();
				for (var k = 0; k <= max; k++) {
					this.matrix[i][j][k] = 0;
				};
			};
		};

		this.log(this.matrix);
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
	sum:function(x,y,z){
		this.log('Sum');
		var y1,x1,sum=0;

	    while (z>0){
	        x1 = x;
	        while(x1 > 0){
	            y1=y;
	            while(y1>0){
	                sum += this.matrix[x1][y1][z];
	    			this.log(this.matrix[x1][y1][z]);
	    			this.log('sum1: '+sum);

	                y1 -= (y1 & -y1);
	    			this.log('y1: '+y1);
	            }
	            x1 -= (x1 & -x1);
	        }
	        z -= (z & -z);
	    }
	    this.log('sumT: '+sum);

	    return sum;
	},
	update:function(n,x,y,z,val){
		this.log('Update');
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