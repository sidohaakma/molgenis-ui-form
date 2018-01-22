import detectLang from '@/util/helpers/langDetect'

describe('langDetect', () => {
  describe('Detect programming language in code snippets', () => {
    it('should recognize python code snippet', () => {
      const pythonCode = 'def greet(name):\n    print "Hello", name\ngreet("Jack")\ngreet("Jill")\ngreet("Bob")'
      expect(detectLang(pythonCode)).to.equal('Python')
    })
    it('should recognize R code snippet', () => {
      const RCode = 'countdown <- function(from) #test\n{\n  print(from)\n  while(from!=0)\n  {\n    Sys.sleep(1)\n    from <- from - 1\n    print(from)\n  }\n}'
      expect(detectLang(RCode)).to.equal('R')
    })
    it('should recognize HTML code snippet', () => {
      const htmlCode = '<!DOCTYPE html>\n<html>\n<body>\n\n<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>\n<h3>This is heading 3</h3>\n<h4>This is heading 4</h4>\n<h5>This is heading 5</h5>\n<h6>This is heading 6</h6>\n\n</body>\n</html>\n'
      expect(detectLang(htmlCode)).to.equal('HTML')
    })
    it('should recognize CSS code snippet', () => {
      const cssCode = '#para1 {\n    text-align: center;\n    color: red;\n}'
      expect(detectLang(cssCode)).to.equal('CSS')
    })
    it('should not recognize text as code', () => {
      const text = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
      expect(detectLang(text)).to.equal('Unknown')
    })
  })
  describe('Detect programming language for print statements', () => {
    it('should recognize python2 print statement', () => {
      const python2Code = 'print "Hello world"'
      expect(detectLang(python2Code)).to.equal('Python')
    })
    it('should recognize python3 print statement (although it is equal to the R printstatement)', () => {
      const python3Code = 'print("Hello world")'
      expect(detectLang(python3Code)).to.equal('Python')
    })
    it('should recognize HTML print statement', () => {
      const htmlCode = '<p>Hello world</p>'
      expect(detectLang(htmlCode)).to.equal('HTML')
    })
    it('should recognize javascript print statement', () => {
      const javascriptCode = 'console.log("Hello world")'
      expect(detectLang(javascriptCode)).to.equal('JavaScript')
    })
    it('should not recognize text as code', () => {
      const text = 'Hello world'
      expect(detectLang(text)).to.equal('Unknown')
    })
  })
  describe('Detect programming language for functions', () => {
    it('should recognize python function', () => {
      const pythonCode = 'def myFunction(arg1, arg2):\n\toutput = arg1 + "=" + arg2\n\treturn output'
      expect(detectLang(pythonCode)).to.equal('Python')
    })
    it('should recognize R function', () => {
      const RCode = 'myfunction <- function(arg1, arg2){\n      output <- arg1 + "=" + arg2\n      return(output)\n    }'
      expect(detectLang(RCode)).to.equal('R')
    })
    it('should recognize javascript function', () => {
      const javascriptCode = 'function myFunction(arg1, arg2){\n      output = arg1 + "=" + arg2;\n      return output;\n    }'
      expect(detectLang(javascriptCode)).to.equal('JavaScript')
    })
    it('should recognize javascript ES6 syntax function', () => {
      const javascriptCode = 'var myFunction = (arg1, arg2) => { return arg1 + "=" + arg2; };'
      expect(detectLang(javascriptCode)).to.equal('JavaScript')
    })
    it('should not recognize text as code', () => {
      const text = 'function\nnoun\n1.an activity that is natural to or the purpose of a person or thing.\n"bridges perform the function of providing access across water"\nsynonymes:\tpurpose, task, use, role\n2.MATHEMATICS\na relation or expression involving one or more variables.\n"the function (bx + c)"\nverb\n1.\nwork or operate in a proper or particular way.\n"her liver is functioning normally"\nsynonymes:\twork, go, run, be in working/running order, operate, perform, be in action, be operative\n"if we unplug a TV set, it ceases to function"'
      expect(detectLang(text)).to.equal('Unknown')
    })
  })
  describe('Use statistics option', () => {
    it('should return object (not string) with two keys: detected and statistics', () => {
      const text = 'Hello world'
      const output = detectLang(text, {heuristic: true, statistics: true})
      expect(typeof output).to.equal('object')
      expect(typeof output.detected).to.equal('string')
      expect(typeof output.statistics).to.equal('object')
    })
    it('should return 8 points for HTML', () => {
      const htmlCode = '<!DOCTYPE html>\n<html>\n<body>\n\n<h1>This is heading 1</h1>\n<h2>This is heading 2</h2>\n<h3>This is heading 3</h3>\n<h4>This is heading 4</h4>\n<h5>This is heading 5</h5>\n<h6>This is heading 6</h6>\n\n</body>\n</html>\n'
      const output = detectLang(htmlCode, {heuristic: true, statistics: true})
      expect(output.statistics.HTML).to.equal(8)
    })
    it('should return 23 points for R', () => {
      const RCode = 'countdown <- function(from) #test\n{\n  print(from)\n  while(from!=0)\n  {\n    Sys.sleep(1)\n    from <- from - 1\n    print(from)\n  }\n}'
      const output = detectLang(RCode, {heuristic: true, statistics: true})
      expect(output.statistics.R).to.equal(23)
    })
    it('should return the same amount of points for python and R', () => {
      const python3Code = 'print("Hello world")'
      const output = detectLang(python3Code, {heuristic: true, statistics: true})
      expect(output.statistics.Python).to.equal(1)
      expect(output.statistics.R).to.equal(1)
    })
  })
})
