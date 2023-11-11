#!/bin/python
import os
from sys import argv, stdout
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
def spawn_out_to_file(file_path, *args): # spawn process, redirect stdout somewhere else
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
    def __init__(self, instance=1, full_path="/bin/yt-dlp", fms={}) -> None:
        self.instance = instance
        self.full_path = full_path
        self.fms = fms
    def check_version(self):
        args = ["yt-dlp", "--version"]
        spawn(self.full_path, *args)
    def download(self, url, *options):
        args = ["yt-dlp", url, *options]
        spawn(self.full_path, *args)
    def decode_format(self, fm): # return a new format object with decoded format
        result = {}
        result["ID"] =  fm[0:3].replace(" ", "")
        result["EXT"] = fm[4:9].replace(" ", "")
        result["RESOLUTION"] = fm[10:20].replace(" ", "")
        result["CH"] = fm[26].replace(" ", "")
        result["FILESIZE"] = fm[31:40].replace(" ", "")
        result["VCODEC"] = fm[56:69].replace(" ", "")
        result["ACODEC"] = fm[76:87].replace(" ", "")
        return result
    def get_formats(self, url, cached=False):
        if(cached):
             return self.fms
        args = ["yt-dlp", url, "-F"]
        spawn_out_to_file("formats.txt", self.full_path, *args)
        with open("formats.txt", "r") as formats:
             start = False
             fms = []
             for line in formats:
                  if start:
                       fms.append(self.decode_format(line))
                  if "-" not in line:
                       continue
                  elif "-" in line:
                       start = True
                       continue
             self.fms = fms
             return fms
    def formats_where(self, keys, values): # Find desired properties from cached video format list
        append = True
        subset = []
        for fm in self.fms:
             for i, key in enumerate(keys):
                  if(fm[key] != values[i]):
                       append = False
             if append:
                  subset.append(fm)
             append = True
        return subset
    def formats_where_not(self, keys, values):
        append = True
        subset = []
        for fm in self.fms:
             for i, key in enumerate(keys):
                  if(fm[key] == values[i]):
                       append = False
             if append:
                  subset.append(fm)
             append = True
        return subset
    def format_marginal(self, key, subset=[]): # A list of every value corresponding to key in the video format list (subset if it isn't empty)
         result = []
         if subset:
              for fm in subset:
                   result.append(fm[key])
              return result
         for fm in self.fms:
              result.append(fm[key])
         return result
if __name__ == "__main__":
     if len(argv) >= 2:
          url = argv[1]
     else:
          print("You need a URL to continue")
          exit(1)
     a_wrapper = wrapper()
     a_wrapper.download(url)
     print("I just downloaded something")
     stdout.flush()
     exit(0)