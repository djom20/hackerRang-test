/**
*
* Cube Summation
* http://test.altiviaot.com/hackerrang/
*
* @author Ing. Jonathan Olier (djom20)
*
*/

function processData(input) {
    //Enter your code here
    $solver.init();
}

window.$solver = {
	matrix: [],
	cases: 	0,
	n: 	0,
	m: 	0,

	init:function(){
		this.log(this.matrix);

		var sw = prompt("Please enter 1 to Current or 2 to Test or 3 to Exit.");
	    if(sw == 1){
	    	this.current();
	    } else if(sw == 2){
	    	this.testing();
	    } else if(sw == 3){
	    	/* Nothing to Exit */
	    	this.message('Exit. To try starting the program reload the page again.');
	    }else{
	    	this.message('The option is not valid. Please try again.');
	    	this.init();
	    }
	},
	current:function(){
		this.cases = 1;
	    while(this.cases--) {
	    	this.log('Case: ' + this.cases);
	        this.process();
	    }

	    this.message('Finish');
	},
	process:function(){
		var x,y,z,x0,y0,z0,value1,value2,val,total = 0;
		var i 		= 6;
		var j 		= 4;
		var pos 	= [0,1,2,3,4,5];
		var command = null;

		this.n = prompt("Please enter 1 number to N");
		if(this.validateInput(this.n)){
			this.log('N: ' + this.n);
	    }

	    this.m = prompt("Please enter other 1 number to M");
		if(this.validateInput(this.m)){
			this.log('M: ' + this.m);
	    }

	    this.initMatrix(0,101);

	    while(this.m--){
	    	command = prompt("Please enter method. U to Update or Q to Query.");

	    	i 	= 6;
			j 	= 4;
	    	if(command.toLowerCase() == "u"){
	    		this.log('Update');
	    		while(j--){
		    		pos[j] = prompt("Please enter 1 number at position " + j);
					if(this.validateInput(pos[i])){
						this.log('Value: ' + pos[i]);
				    }
	    		}

	    		x	= pos[0];
	    		x0	= pos[0];
				y	= pos[1];
				y0	= pos[1];
				z	= pos[2];
				z0	= pos[2];
				val	= pos[3];

				value1 	= this.sum(x,y,z)- this.sum(x0-1,y,z) - this.sum(x,y0-1,z) + this.sum(x0-1,y0-1,z);
            	value2 	= this.sum(x,y,z0-1) - this.sum(x0-1,y,z0-1) - this.sum(x,y0-1,z0-1)  + this.sum(x0-1,y0-1,z0-1);
            	total 	= val -(value1 - value2);

            	this.update(this.n,x,y,z,total);
	    	}else if(command.toLowerCase() == "q"){
	    		this.log('Query Process');
	    		while(i--){
		    		pos[i] = prompt("Please enter 1 number at position " + i);
					if(this.validateInput(pos[i])){
						this.log('Value: ' + pos[i]);
				    }
	    		}

	    		x0	= pos[0];
				x	= pos[1];
				y0	= pos[2];
				y	= pos[3];
				z0	= pos[4];
				z	= pos[5];

	            value1 = this.sum(x,y,z) - this.sum(x0-1,y,z) - this.sum(x,y0-1,z) + this.sum(x0-1,y0-1,z);
	            value2 = this.sum(x,y,z0-1) - this.sum(x0-1,y,z0-1) - this.sum(x,y0-1,z0-1)  + this.sum(x0-1,y0-1,z0-1);

	            total = value1 - value2;
	            this.message('Total: ' + total);
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

		// this.log(this.matrix);
	},
	validateInput:function(n){
		if(n != ('' && null)){
			n = parseInt(n);
			if(typeof n == 'number'){
				if(n > 0){
					return true;
				} else {
					this.message('Entry must be greater than zero.');
				}
			}
		}else{
			this.message('The entry can not be null or empty.');
		}

		return false;
	},
	sum:function(x,y,z){
		// this.log('Query Process');
		var y1,x1,sum=0;

	    while (z>0){
	        x1 = x;
	        while(x1 > 0){
	            y1=y;
	            while(y1>0){
	                sum += this.matrix[x1][y1][z];
	    			// this.log(this.matrix[x1][y1][z]);
	    			// this.log('sum1: '+sum);

	                y1 -= (y1 & -y1);
	    			// this.log('y1: '+y1);
	            }
	            x1 -= (x1 & -x1);
	        }
	        z -= (z & -z);
	    }
	    // this.log('sumT: '+sum);

	    return sum;
	},
	update:function(n,x,y,z,val){
		// this.log('Update Process');
		this.log('n: '+n);
		this.log('x: '+x);
		this.log('y: '+y);
		this.log('z: '+z);
		this.log('val: '+val);
		var y1,x1 = 0;

	    while(z <= n) {
	        x1 = x;
	        this.log('x1: '+x1);
	        while(x1 <= n) {
	            y1 = y;
	            this.log('y1: '+y1);
	            while(y1 <= n) {
	                this.matrix[x1][y1][z] += val;
	                this.log('update to x:'+x1+' y:'+y1+' z:'+z);
	                y1 += (y1 & -y1);
	            }
	            x1 += (x1 & -x1);
	        }
	        z += (z & -z);
	    }
	},
	testing:function(){
		this.cases = prompt("Please enter number of test.");
		if(this.validateTestInput(this.cases)){
			while(this.cases--) {
		    	this.log('Number Test: ' + this.cases);
		        this.process();
		    }
	    } else {
	    	this.testing();
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
						this.message('Entry must be less than 50.');
					}
				} else {
					this.message('Entry must be greater than one.');
				}
			}
		}else{
			this.message('The entry can not be null or empty.');
		}

		return false;
	},
	message:function(input){
		this.log(input);
		alert(input);
	},
	log:function(input){
		console.log(input);
	}
};