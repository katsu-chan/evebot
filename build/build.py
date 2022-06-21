import sys

old = '''//build target
const token = ""
'''
new = 'const token = "' + sys.argv[1] +'"'

f = open("functions/api/index.ts", "r")
src = f.read()
f.close()

print(src)

new2 = src.replace(old, new)

f = open("functions/api/index.ts", "w")
f.write(new2)
f.close()