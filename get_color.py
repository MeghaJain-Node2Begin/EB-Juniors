import urllib.request
import re

# let's try to parse the png structure if PIL is not present
# Actually, I'll just write a script that doesn't need to parse PNGs, but uses standard library tkinter
import tkinter as tk
from tkinter import PhotoImage

root = tk.Tk()
img = PhotoImage(file='d:/Extrabits-Junior/logo1-transparent.png')
w = img.width()
h = img.height()
colors = {}
for y in range(h):
    for x in range(w):
        r, g, b = img.get(x, y)
        if r > 240 and g > 240 and b > 240: continue
        if r == 0 and g == 0 and b == 0: continue
        hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
        colors[hex_color] = colors.get(hex_color, 0) + 1

sorted_colors = sorted(colors.items(), key=lambda item: item[1], reverse=True)
print(sorted_colors[:5])
root.destroy()
