'''This is a class representing a Gaussian Integer which can be used to construct Gaussian integers, 
add and multiply them, and print them.
A Gaussian Integer is a complex number of the form a+bi where a and b are integers. 
a is the real part and b is the imaginary part

You add two Gaussian Integers by adding their real parts and imaginary parts, so
(a+bi ) +  (c+di ) is (a+c) +(b+d)i
(1+2i) +  (3+4i)  = (4+6i)

You multiply them using the assumption that i*i=-1, so
(a+bi)*(c+di) = (ac-bd)+(ad+bc)i
(1+ 2i)*(2+3i) = (-4 + 7i)'''

class Gaussian_Integer():
    def __init__(self, a, b):
        self.a = a;
        self.b = b;
    
    def print_self(self):
        print('this GI: a:', self.a );
        print('this GI: b:', self.b );

    def add(self, gi):
        sum = (self.a + gi.a) + (self.b + gi.b)i;
        return sum;

u = Gaussian_Integer(2,1)
u.print_self()
print(u.add(Gaussian_Integer(3,2)))

