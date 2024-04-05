---
layout: post
title:  "プログラミング言語ランキング"
date:   2024-04-02 23:34:07 +0900
categories: jekyll update
---

**tkinter** is GUI library for python.
It is ~~good~~ super library.

{% highlight python %}
import tkinter as tk
import moderngl
from scene.canvas import Canvas
from PIL import Image, ImageTk
from typing import Callable


class FramebufferImage(ImageTk.PhotoImage):
    def __init__(self, master, ctx, size):
        super(FramebufferImage, self).__init__(Image.new("RGB", size, (0, 0, 0)))
        self.ctx = ctx
        self.fbo = self.ctx.simple_framebuffer(size)
        self.scope = self.ctx.scope(self.fbo)

    def __enter__(self):
        self.scope.__enter__()

    def __exit__(self, *args):
        self.scope.__exit__(*args)
        self.paste(
            Image.frombytes("RGB", self.fbo.size, self.fbo.read(), "raw", "RGB", 0, -1)
        )


class Window:
    def __init__(self, title: str = "もふもふ♡物理エンジン", size=(512, 512)) -> None:
        self.root = tk.Tk()
        self.root.title(title)
        self.root.state("zoomed")
        self.root.bind("<Key>", self.on_click)
        # self.root.protocol("WM_DELETE_WINDOW", self.on_close)

        self.ctx = moderngl.create_standalone_context()
        self.canvas = Canvas(self.ctx)

        self.set_canvas()
        self.set_gui()
        self._update_func: Callable | None = None

    def on_click(self, event: tk.Event):
        self.canvas.camera.key_bind(event.keysym)

    def set_gui(self):

        def camera_move():
            self.canvas.is_ok = True

        t = tk.Button(self.root, text="Camera", command=camera_move)
        t.pack()

        self.label = tk.Label(self.root, text=f"")
        self.label.pack()

        self.label2 = tk.Label(self.root, text=f"Hello!!!")
        self.label2.pack()

    def set_canvas(self):
        self.tkfbo = FramebufferImage(self.root, self.ctx, size=(512, 512))

        lbl = tk.Label(self.root, image=self.tkfbo)
        # lbl.bind("<ButtonPress-1>", self._update)
        # lbl.bind("<ButtonRelease-1>", self._update)
        lbl.pack()

    def update_gui(self):
        text = "\n".join(
            [f"{m.name}: ({m.x}, {m.y}, {m.z})" for m in self.canvas.mobject]
        )
        self.label["text"] = text

    def _update(self):
        with self.tkfbo:
            if self._update_func:
                self._update_func()
            self.canvas.render()
            self.update_gui()

    def update(self, f):
        if callable(f):
            self._update_func = f

    def run(self):
        def update_loop():
            self._update()
            self.root.after(100, update_loop)

        update_loop()
        self.root.mainloop()


if __name__ == "__main__":
    from mobject.mobject import Vertex, Mobject
    from mobject.shape import Circle, Square
    from mobject.geometry import Sphere, Cube


    win = Window()
    # v = Circle([0, 0.3, 0.5], 0.1, color=(0.0, 0, 1), name="Circle1", fill=True)
    # s = Square([0.5, 0.5], 0.4, 0.8, name="Square1", fill=True)
    # sp = Sphere([0, 0, 0.5], 0.2, color=(0.5, 0, 0.8), name="Good Sphere", fill=True)
    c = Cube([0, 0, 0], 2, fill=True)
    # sp = Vertex([0, 0.3, 0.4, -0.2], [0.3, 0.4, 0.5, -0.4], [0.4, -0.5, 0, 0.2], name="unchi")
    # win.canvas.add([v, p1, s, sp])
    win.canvas.add([c ])

    # @win.update
    # def upd():
    #     v.x -= 0.01
    #     s.x += 0.01
    #     s.z -= 0.01

    # def d():
    #     s.x = 0
    #     s.y = 0
    #     v.x = 0
    #     v.y = 0

    # win.test = d

    win.run(){% endhighlight %}
