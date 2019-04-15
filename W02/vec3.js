//Constructor
Vec3 = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

//Add method
Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

//Sum method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

//min method
Vec3.prototype.min = function()
{
    if(this.x<=this.y&&this.x<=this.z){
	return this.x;
    }

    else if(this.y<=this.z){
	return this.y;
    }

    else{
	return this.z;
    }
}

//mid method
Vec3.prototype.mid = function()
{
    if(this.x<=this.y&&this.x<=this.z){
	if(this.y<=this.z){
	    return this.y;
	}
	else{
	    return this.z;
	}
    }

    else if(this.y<=this.z){
	if(this.x<=this.z){
	    return this.x;
	}
	else{
	    return this.z;
	}
    }

    else{
	if(this.x<=this.y){
	    return this.x;
	}
	else{
	    return this.y;
	}
    }
}

//max method
Vec3.prototype.max = function()
{
    if(this.x>=this.y&&this.x>=this.z){
	return this.x;
    }

    else if(this.y>=this.z){
	return this.y;
    }

    else{
	return this.z;
    }
}

//triangle area method
AreaOfTriangle = function(v1, v2, v3)
{
    var a = Math.sqrt((v1.x-v2.x)*(v1.x-v2.x)+(v1.y-v2.y)*(v1.y-v2.y)+(v1.z-v2.z)*(v1.z-v2.z));
    var b = Math.sqrt((v2.x-v3.x)*(v2.x-v3.x)+(v2.y-v3.y)*(v2.y-v3.y)+(v2.z-v3.z)*(v2.z-v3.z));
    var c = Math.sqrt((v3.x-v1.x)*(v3.x-v1.x)+(v3.y-v1.y)*(v3.y-v1.y)+(v3.z-v1.z)*(v3.z-v1.z));
    var s = (a + b + c) / 2;

    return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}
