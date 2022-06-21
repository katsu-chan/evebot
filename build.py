import sys

old = '''//build target
const token = ""
'''
new = 'const token = "' + sys.argv[1] +'"'

f = open("build/functions/api/index.ts", "rw")
f.write(f.read().replace(old, new))