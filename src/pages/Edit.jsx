import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
export default function Edit() {
  // const params=useParams()
  // console.log(params.id)
  const{id}=useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({

    title: '',
    amount: 0,
    category: "",
  })
  const [isloading, setIsloading] = useState(false)
  const fetchSingleExpense=async()=>{
    try {
      const res=await axios.get(`http://localhost:7000/api/expense/view/${id}`)
      // console.log(res.data)
      if (res.data.success) {
        setFormData(res.data.expenseDetails)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{fetchSingleExpense()},[])
  const handleSubmit = async () => {
    //  console.log(formData)
    setIsloading(true)
    try {
      const res = await axios.put(`http://localhost:7000/api/expense/edit/${id}`, formData)
      //  console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)

        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsloading(false)
      }, 2000)
    }
  }
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant='h4'>Add Expenses Details</Typography>
      </Box>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField
            value={formData.title}
            fullWidth
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            label="Enter the expense title " placeholder='Enter the expense title here'
            sx={{ mb: 2 }} />
          <TextField
            value={formData.amount} fullWidth
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            label="Enter the expense amount " placeholder='Enter the expense amount here'
            type="number" sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Expense category</InputLabel>
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              // value={age}
              label="Expense category"
              // onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Cloth"}>Cloth</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit}
            sx={{ mb: 1 }} variant='contained' fullWidth
            loading={isloading}
          >Submit</Button>
          <Button component={Link} to="/" sx={{ mb: 1 }} variant='outlined' color='secondary' fullWidth>View Entries</Button>

        </Paper>
      </Box>
    </Box>
  )
}
