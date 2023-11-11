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
    def decode_format_header(self, header, exclude=""):
         last_space = True
         result = []
         header = header.replace("|", "")
         header = header.replace(exclude, "")
         for i,c in enumerate(header):
            if c != " " and last_space:
                 last_space = False
                 result.append(i)
            elif c == " ":
                 last_space = True
         return result, header
    def decode_format(self, fm, header_slices, header): # return a new format object with decoded format
        fm = fm.replace("|", "")
        result = {}
        for i, elem in enumerate(header_slices):
              if(i+1 >= len(header_slices)):
                   result[header[elem:]] = fm[elem:]
              else:
                   result[header[elem:header_slices[i+1]]] = fm[elem:header_slices[i+1]]        
        return result
    def get_formats(self, url):
        args = ["yt-dlp", url, "-F"]
        spawn_out_to_file("formats.txt", self.full_path, *args)
        with open("formats.txt", "r") as formats:
             header_slices = []
             header = ""
             start = False
             fms = []
             for line in formats:
                  if start:
                       fms.append(self.decode_format(line, header_slices, header))
                  if "ID" in line:
                       header_slices, header = self.decode_format_header(line, exclude="MORE INFO\n")
                  if "-" not in line:
                       continue
                  elif "-" in line:
                       start = True
                       continue
             print([fms[i]['FILESIZE   '] for i in range(len(fms))])
if __name__ == "__main__":
    a_wrapper = wrapper()
    a_wrapper.check_version()
    a_wrapper.get_formats("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    