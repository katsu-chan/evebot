import sys

old = '''//build target
const token = ""
'''
new = 'const token = "' + sys.argv[1] +'"'

f = open("build/functions/api/index.ts", "r")
src = f.read()
f.close()

print(src)

new2 = src.replace(old, new)

f = open("build/functions/api/index.ts", "r")
f.write(new2)
f.close()