#!/bin/python
import os
def spawn(*args): # spawn a process and wait for it to complete
    pid = os.fork()
    if pid == 0:
            try:
                os.execl(*args)
            except OSError:
                print("The process failed to run. Make sure the program is installed.")
    else:
        try:
            os.waitpid(pid, 0)
        except ChildProcessError:
            print("There is no instance of yt-dlp to wait for.")
def spawn_out_to_file(file_path, *args): # spawn process, redirect stdout somewhere eles
    pid = os.fork()
    if pid == 0:
        try:
                file = open(file_path, "w+")
                os.dup2(file.fileno(), 1) # Duplicates file descriptor to stdout
                os.execl(*args)
        except OSError:
                print("The process failed to run. Make sure the program is installed.")
    else:
        try:
            os.waitpid(pid, 0)
        except ChildProcessError:
            print("There is no instance of yt-dlp to wait for.")
class format():
     def __init__(self) -> None:
          pass
class wrapper():
    def __init__(self, instance=1, full_path="/bin/yt-dlp") -> None:
        self.instance = instance
        self.full_path = full_path
    def check_version(self):
        args = ["yt-dlp", "--version"]
        spawn(self.full_path, *args)
    def download(self, url, *options):
        args = ["yt-dlp", url, *options]
        spawn(self.full_path, *args)
    def decode_format(self, fm): # return a new format object with decoded format
        fm = fm.replace("|", "")
        fm = fm.replace("only", "")
        fm = fm.replace("~", "")
        fm = fm.replace("≈", "")
        fm = fm.split()
        fid = fm[0]
        container = fm[1]
        resolution = fm[2]
        if(fm[2] != 'audio'):
            fps=fm[3]
            protocol=fm[4]
            
        else:
            fps=-1
            protocol=fm[3]
    def get_formats(self, url):
        args = ["yt-dlp", url, "-F"]
        spawn_out_to_file("formats.txt", self.full_path, *args)
        with open("formats.txt", "r") as formats:
             start = False
             for line in formats:
                  if start:
                       self.decode_format(line)
                  if "-" not in line:
                       continue
                  elif "-" in line:
                       start = True
                       continue

if __name__ == "__main__":
    a_wrapper = wrapper()
    a_wrapper.check_version()
    a_wrapper.get_formats("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
