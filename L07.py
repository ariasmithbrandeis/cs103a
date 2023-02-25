def f2c(n):
    ''' returns Celsius value after conversion of F to Celsius
    '''
    c = (n-32)*5/9
    return c

for i in range(0,101,10):
    print (f2c(i))

