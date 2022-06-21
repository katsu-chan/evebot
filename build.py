import sys

old = '''//build target
const token = ""
'''
new = 'const token = "' + sys.argv[1] +'"'

f = open("build/functions/api/index.ts", "rw")

src = f.read()

print(src)

new2 = src.replace(old, new)

f.write(new2)

new3 = f.read()

print(new3)

f.close()